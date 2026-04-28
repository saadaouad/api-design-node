import type { Response, NextFunction } from 'express';

import type { AuthenticatedRequest } from '../types/index.ts';
import { verifyToken } from '../utils/index.ts';

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    console.error('Authentication error', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
