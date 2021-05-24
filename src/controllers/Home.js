class HomeController {
  index(req, res) {
    res.json({
      teste: '200',
    });
  }
}

export default new HomeController();
