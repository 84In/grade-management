export const jwtConstants = {
  accessSecret: process.env.JWT_SECRET || 'access-secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
  accessExpiresIn: process.env.JWT_EXPIRATION || '1h',
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};
