class HomeController {
  index(req, res) {
    return res.json(
      {
        'Welcome to my library!':
        {
          'Command list':
        'Listar comandos aqui',
        },
      },
    );
  }
}

export default new HomeController();
