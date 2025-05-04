import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addToBlacklist(token: string, ttl: number): Promise<void> {
    await this.cacheManager.set(token, 'blacklisted', ttl);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    try {
      const result = await this.cacheManager.get<string>(token);
      const isBlacklisted = result === 'blacklisted';
      this.logger.debug(
        `Token ${token} is ${isBlacklisted ? '' : 'not '}blacklisted`,
      );
      return isBlacklisted;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to check blacklist for token: ${message}`);
      return false;
    }
  }
}
