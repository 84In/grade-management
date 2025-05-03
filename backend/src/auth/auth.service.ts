import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import { PasswordHelper } from 'src/common/helpers/password.helper';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { TokenBlacklistService } from './token-blacklist.service';
import { JwtPayloadSchema } from './schemas/jwt-payload.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly logger: Logger,
  ) {}

  // Xác thực người dùng qua username & password
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (
      !user ||
      !(await PasswordHelper.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  // Đăng nhập, tạo access_token và refresh_token
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const access_token = this.jwtService.sign(
      { sub: user.id },
      {
        secret: jwtConstants.accessSecret,
        expiresIn: jwtConstants.accessExpiresIn,
      },
    );

    const refresh_token = this.jwtService.sign(
      { sub: user.id },
      {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshExpiresIn,
      },
    );

    await this.refreshTokenRepository.save({
      token: refresh_token,
      user,
      expires: new Date(Date.now() + this.ms(jwtConstants.refreshExpiresIn)),
    });

    return {
      access_token,
      refresh_token,
      id: user.id,
      type: user.type,
    };
  }

  // Làm mới access token
  async refreshToken(token: string) {
    const existing = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!existing) throw new UnauthorizedException('Token not found');
    if (existing.expires < new Date())
      throw new UnauthorizedException('Token expired');

    const user = existing.user;
    const access_token = this.jwtService.sign(
      { sub: user.id },
      {
        secret: jwtConstants.accessSecret,
        expiresIn: jwtConstants.accessExpiresIn,
      },
    );

    return { access_token };
  }

  // Đăng xuất: xoá refresh_token khỏi DB + cho vào blacklist để chặn reuse access_token
  async logout(token: string, access_token: string) {
    await this.refreshTokenRepository.delete({ token });

    if (!this.jwtService.decode(access_token)) {
      throw new UnauthorizedException('Invalid token');
    }
    const result = JwtPayloadSchema.safeParse(
      this.jwtService.decode(access_token),
    );
    if (!result.success) {
      throw new UnauthorizedException('Invalid token structure');
    }
    const { exp } = result.data;
    const expiresIn = exp - Math.floor(Date.now() / 1000);
    this.logger.log('date', Math.floor(Date.now() / 1000));
    this.logger.log('exp', exp);
    await this.tokenBlacklistService.addToBlacklist(access_token, expiresIn);
  }

  // Chuyển đổi thời gian (3h, 1d, etc.) sang milliseconds
  private ms(duration: string): number {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error('Invalid time format');
    const [, num, unit] = match;
    const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
    return parseInt(num) * multipliers[unit as keyof typeof multipliers];
  }

  // Cron Job: Xoá các refresh token hết hạn mỗi ngày lúc 00:00
  @Cron('0 0 * * *')
  async cleanupExpiredTokens() {
    await this.refreshTokenRepository.delete({
      expires: LessThan(new Date()),
    });
    console.log('✅ Đã dọn dẹp các refresh token hết hạn');
  }
}
