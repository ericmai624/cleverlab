import express from 'express';
import next from 'next';
import http from 'http';
import createSocketIOServer from './io';
import { morgan, bodyParser } from './middleware';
import graphqlHandler from './graphql';

const app = express();
const server = http.Server(app);

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

createSocketIOServer(server); // create socket.io server

nextApp.prepare()
  .then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    app.get('/', (req, res) => nextApp.render(req, res, '/', req.query));

    app.get('/signup', (req, res) => nextApp.render(req, res, '/signup', req.query)); 
    
    app.use('/graphql', graphqlHandler); // graphql endpoint

    app.get('*', (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  });
