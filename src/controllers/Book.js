import Book from '../models/Book';

class BookController {
  async index(req, res) {
    try {
      const queryParams = { ...req.query };

      if (Object.keys(queryParams).length !== 0) {
        const validQueries = ['id', 'name', 'serie', 'volume', 'author', 'published_at', 'pages'];
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
          attributes: validQueries,
        });

        if (books.length === 0) {
          return res.status(404).json({
            errors: ['No books found with the requested params'],
          });
        }

        return res.json({ books });
      }
      const validQueries = ['id', 'name', 'serie', 'volume', 'author', 'published_at', 'pages'];

      const books = await Book.findAll({
        attributes: validQueries,
      });

      return res.json({ books });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Missing required id'] });
      }

      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json({ errors: ['No books found with the requested id'] });
      }

      const {
        name, serie, volume, author, published_at, pages,
      } = book;

      return res.json({
        books: [{
          id, name, serie, volume, author, published_at, pages,
        }],
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async create(req, res) {
    try {
      const {
        name = '', serie = '', volume = '', author = '', published_at = '', pages = '',
      } = req.body;

      if (!name || !author || !published_at || !pages) {
        return res.status(400).json({
          errors: ['Missing required fields'],
        });
      }

      const params = [
        'name', 'serie', 'volume', 'author', 'published_at', 'pages',
      ];

      const existingBook = await Book.findOne({
        where: {
          name, serie, volume,
        },
        attributes: params,
      });

      if (existingBook) {
        return res.status(400).json({
          errors: ['This book already exists', existingBook],
        });
      }

      await Book.create({
        name, serie, volume, author, published_at, pages,
      });

      return res.json({
        'Book created': {
          name, serie, volume, author, published_at, pages,
        },
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Missing required id'] });
      }

      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json({ errors: ['No books found with the requested id'] });
      }

      const updatedBook = await book.update(req.body);

      const {
        name, serie, volume, author, published_at, pages,
      } = updatedBook;

      return res.json({
        updated: [{
          id, name, serie, volume, author, published_at, pages,
        }],
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['Missing required id'] });
      }

      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json({ errors: ['No books found with the requested id'] });
      }

      const {
        name, serie, volume, author, published_at, pages,
      } = book;

      book.destroy();

      return res.json({
        deleted: [{
          id, name, serie, volume, author, published_at, pages,
        }],
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new BookController();
