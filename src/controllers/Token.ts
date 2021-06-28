import { Request, Response } from 'express';
import authConfig from '../config/auth';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async create(req: Request, res: Response) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errors: ['Invalid credentials'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        errors: ['Invalid credentials'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(400).json({
        errors: ['Invalid credentials'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, authConfig.jwt.secret, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
