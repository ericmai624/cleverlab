const express = require('express');
const app = express();
const next = require('next');
const server = require('http').Server(app);
const io = require('./io')(server);

const middleware = require('./middleware');

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare()
  .then(() => {
    app.use(middleware.morgan('dev'));

    app.get('/', (req, res) => nextApp.render(req, res, '/', req.query));
    app.get('/signup', (req, res) => nextApp.render(req, res, '/signup', req.query));
    
    app.get('*', (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  });
