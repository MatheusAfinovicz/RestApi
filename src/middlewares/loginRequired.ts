import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '../config/auth'
import User from '../models/User';

interface TokenPayload {
  id: number,
  email: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Missing JST Token'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = verify(token, authConfig.jwt.secret);
    const { id, email } = data as TokenPayload;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user'],
      });
    }

    req.user = {
      id,
      email
    }

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid or expired token'],
    });
  }
};
