import express from 'express';
import next from 'next';
import io from './io';
import graphqlHandler from './graphql';
import * as middleware from './middleware';
import { Server } from 'http';
import { graphiqlExpress } from 'apollo-server-express';

const app = express();
const server = Server(app);

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.attach(server);

nextApp.prepare()
  .then(() => {
    app.use(middleware.bodyParser.json());
    app.use(middleware.bodyParser.urlencoded({ extended: true }));
    app.use(middleware.session);
    app.use(middleware.morgan('dev'));

    /* redirect routes */
    app.get('/signin', (req, res) => res.redirect(303, '/login'));
    app.get('/signup', (req, res) => res.redirect(303, '/join'));
    app.get('/logout', (req, res) => res.redirect(303, '/signout'));
    
    /* data route */
    app.use('/graphql', graphqlHandler);
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

    app.get('/signout', (req, res) => req.session.destroy(res.redirect.bind(res, '/')));

    app.get('*', nextHandler);

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  });
