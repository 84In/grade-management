import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class TokenBlacklistService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addToBlacklist(token: string, ttl: number): Promise<void> {
    await this.cacheManager.set(token, 'blacklisted', ttl);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.cacheManager.get(token);
    return result === 'blacklisted';
  }
}
