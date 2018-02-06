import express from 'express';
import next from 'next';
import http from 'http';
import io from './io';
import graphqlHandler from './graphql';
import { auth, bodyParser, morgan, session } from './middleware';
import { graphiqlExpress } from 'apollo-server-express';

const app = express();
const server = http.Server(app);

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.attach(server);

nextApp.prepare()
  .then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session);
    app.use(morgan('dev'));

    app.get('/', (req, res) => nextApp.render(req, res, '/', req.query));

    app.get('/signup', (req, res) => nextApp.render(req, res, '/signup', req.query));

    app.get('/signout', (req, res) => req.session.destroy(res.redirect.bind(res, '/')));
        
    app.use('/graphql', graphqlHandler);
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

    app.get('*', (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  });
