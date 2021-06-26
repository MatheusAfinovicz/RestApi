class HomeController {
  index(req, res) {
    return res.json(
      {
        'Welcome to my library!':
        {
          Endpoints: {
            '/': {
              GET: { RETURN: 'The endpoints list' },
            },
            '/books': {
              GET: {
                RETURN: 'All or one book',
                QUERY: 'id, name, serie, volume, author, published_at, pages',
                PARAMS: 'id',
              },
              POST: {
                RETURN: 'A new book',
                BODY: {
                  OBRIGATORY: 'name, author, published_at, pages',
                  OPTIONAL: 'serie, volume',
                },
                AUTHENTICATION: 'Bearer token',
              },
              PUT: {
                RETURN: 'The updated book',
                BODY: {
                  OBRIGATORY: 'name, author, published_at, pages',
                  OPTIONAL: 'serie, volume',
                },
                AUTHENTICATION: 'Bearer token',
                PARAMS: 'id',
              },
              DELETE: {
                RETURN: 'The deleted book',
                AUTHENTICATION: 'Bearer token',
                PARAMS: 'id',
              },
            },

            '/users': {
              POST: {
                RETURN: 'A new user',
                BODY: 'User email and password',
              },
              PUT: {
                RETURN: 'An updated user',
                BODY: 'Email and/or password',
                AUTHENTICATION: 'Bearer token',
              },
              DELETE: {
                RETURN: 'The deleted user',
                AUTHENTICATION: 'Bearer token',
              },
            },
            '/tokens': {
              POST: {
                RETURN: 'A token for an user',
                BODY: 'User email and password',
              },
            },
          },
        },
      },
    );
  }
}

export default new HomeController();
