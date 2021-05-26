import Book from '../models/Book';

class HomeController {
  async create(req, res) {
    try {
      const {
        name = '', serie = '', volume = '', author = '', publishedAt = '', pages = '',
      } = req.body;

      if (!name || !author || !publishedAt || !pages) {
        return res.status(400).json({
          errors: ['Missing required fields'],
        });
      }

      const existingBook = await Book.findOne({
        where: {
          name, serie, volume,
        },
      });

      if (existingBook) {
        return res.status(400).json({
          errors: ['This book already exists'],
        });
      }

      const newBook = await Book.create({
        name,
        serie,
        volume,
        author,
        published_at: publishedAt,
        pages,
      });

      return res.json({ sucess: newBook });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new HomeController();
