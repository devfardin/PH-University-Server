/* eslint-disable prettier/prettier */
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
    }
  }
}

export {}; // Ensure this file is treated as a module