import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'coaniquem-dev-secret',
  expiration: process.env.JWT_EXPIRATION || '24h',
}));
