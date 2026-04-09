import { registerAs } from '@nestjs/config';

export default registerAs('bsale', () => ({
  apiUrl: process.env.BSALE_API_URL || 'https://api.bsale.cl/v1',
  accessToken: process.env.BSALE_ACCESS_TOKEN,
}));
