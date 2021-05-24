import { request } from 'express';
import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      console.log(request.body);
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
