import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { success } from 'src/common/helpers/response.helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return success('Login successful', result);
  }
  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    const result = await this.authService.refreshToken(body.refresh_token);
    return success('Token refreshed successfully', result);
  }

  @Post('logout')
  async logout(@Body() body: { token: string; access_token: string }) {
    const result = await this.authService.logout(body.token, body.access_token);
    return success('Logout success', result);
  }
}
