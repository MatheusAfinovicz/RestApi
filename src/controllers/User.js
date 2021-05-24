import User from '../models/User';

class UserController {
  async create(req, res) {
    const newUser = await User.create({
      email: 'teste2@teste.com',
      password: 'testando',
    });
    res.json(newUser);
  }
}

export default new UserController();
