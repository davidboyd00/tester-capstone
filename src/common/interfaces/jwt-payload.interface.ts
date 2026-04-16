import { Role } from '../enums';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  storeId: number | null;
}
