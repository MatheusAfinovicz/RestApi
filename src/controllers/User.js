import User from '../models/User';

class UserController {
  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (user) {
        return res.json({ user });
      }

      return res.status(400).json({ errors: ['User not found'] });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async create(req, res) {
    try {
      const newUser = await User.create(req.body);

      return res.json({ sucess: newUser });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({
          errors: ['Missing email'],
        });
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const newUser = await user.update(req.body);

      return res.json({ sucess: newUser });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({
          errors: ['Missing email'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ errors: ['User not found'] });
      }

      user.destroy();
      return res.json({ sucess: 'User deleted' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
