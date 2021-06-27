import User from '../models/User';
import { Request, Response } from 'express';


class UserController {
  async show(req: Request, res: Response) {
    try {
      const queryParams = { ...req.query };

      const validQueries = ['id', 'email'];
      const paramsKeys = Object.keys(queryParams);

      paramsKeys.forEach((key) => {
        if (!(validQueries.includes(key))) {
          return res.status(400).json({
            errors: ['Invalid query params'],
          });
        }
      });

      const users = await User.findAll({
        where: queryParams,
        attributes: ['id', 'email', 'created_at'],
      });

      return res.json({ users });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err: Error) => err.message),
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);

      const { id, email } = newUser;

      return res.json({ id, email });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err: Error) => err.message) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const updatedUser = await user.update(req.body);
      const { email } = updatedUser._attributes;

      return res.json({ id, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err: Error) => err.message),
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(400).json({ errors: ['User not found'] });
      }

      const email = req.user.email;

      user.destroy();
      return res.json({ 'User deleted': { id, email } });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err: Error) => err.message),
      });
    }
  }
}

export default new UserController();
