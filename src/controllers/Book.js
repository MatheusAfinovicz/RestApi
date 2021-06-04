import Book from '../models/Book';

class BookController {
  async show(req, res) {
    try {
      const queryParams = { ...req.query };

      if (Object.keys(queryParams).length !== 0) {
        const validQueries = ['name', 'serie', 'volume', 'author', 'published_at', 'pages'];
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
      const validQueries = ['name', 'serie', 'volume', 'author', 'published_at', 'pages'];

      const books = await Book.findAll({
        attributes: validQueries,
      });

      return res.json({ books });
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
      const queryParams = { ...req.query };

      if (Object.keys(queryParams).length !== 0) {
        const validQueries = ['name', 'serie', 'volume', 'author', 'published_at', 'pages'];
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

        if (books.length > 1) {
          return res.status(400).json({
            errors: ['More than one book found with the requested params', { books }],
          });
        }

        if (books.length === 0) {
          return res.status(404).json({
            errors: ['No books found with the requested params'],
          });
        }

        const book = await Book.findOne({
          where: queryParams,
        });

        const updatedBook = await book.update(req.body);
        const {
          name, serie, volume, author, published_at, pages,
        } = updatedBook;

        return res.json({
          'Book updated': {
            name, serie, volume, author, published_at, pages,
          },
        });
      }
      return res.status(400).json({
        errors: ['No query params found, be more specific'],
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const queryParams = { ...req.query };

      if (Object.keys(queryParams).length !== 0) {
        const validQueries = ['name', 'serie', 'volume', 'author', 'published_at', 'pages'];
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

        if (books.length > 1) {
          return res.status(400).json({
            errors: ['More than one book found with the requested params', { books }],
          });
        }

        if (books.length === 1) {
          return res.status(404).json({
            errors: ['No books found with the requested params'],
          });
        }

        const book = await Book.findOne({
          where: queryParams,
        });

        book.destroy();

        return res.json({ 'Book deleted': books });
      }
      return res.status(400).json({
        errors: ['No query params found, be more specific'],
      });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new BookController();
