const express = require('express');
const app = express();
const next = require('next');
const server = require('http').Server(app);

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare()
  .then(() => {
    app.get('*', (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  })
  .catch(console.log);
