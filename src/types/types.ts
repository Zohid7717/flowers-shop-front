import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export interface AuthRequest extends Request {
  userId?: string;
}

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id: string
  }
}

export interface MyJwtPayload extends JwtPayload {
  id: string;
}