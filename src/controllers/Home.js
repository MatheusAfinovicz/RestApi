import Book from '../models/Book';

class HomeController {
  async index(req, res) {
    const newBook = await Book.create({
      name: 'Livro Teste',
      serie: 'Testando',
      volume: 2,
      author: 'Matheus A.',
      published_at: '2021-05-20',
      pages: 25,
    });
    res.json(newBook);
  }
}

export default new HomeController();
