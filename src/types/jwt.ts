import type { Request } from 'express';
import type { JWTPayload } from 'jose';

export type JwtPayload = JWTPayload & {
  id: string;
  email: string;
  username: string;
};

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
