import Book from '../models/Book';

class HomeController {
  async index(req, res) {
    try {
      const queryParams = { ...req.query };

      if (queryParams) {
        const validQueries = ['name', 'serie', 'volume', 'author', 'publishedAt', 'pages'];
        const paramsQueries = Object.keys(queryParams);

        paramsQueries.forEach((key) => {
          if (!(validQueries.includes(key))) {
            return res.status(400).json({
              errors: ['Invalid query params'],
            });
          }
        });

        const books = await Book.findAll({
          where: queryParams,
        });

        if (books.length === 0) {
          return res.status(404).json({
            errors: ['No books found with the requested params'],
          });
        }

        return res.json({ books });
      }
      const books = await Book.findAll();

      return res.json({ books });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

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
