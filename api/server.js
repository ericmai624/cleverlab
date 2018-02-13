import express from 'express';
import next from 'next';
import io from './io';
import graphqlHandler from './graphql';
import * as middleware from './middleware';
import createDebug from 'debug';
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
    
    const routes = [
      { path: '/graphql', handler: graphqlHandler, method: 'use' },
      { path: '/graphiql', handler: graphiqlExpress({ endpointURL: '/graphql' }), method: 'use' },
      { path: '/logout', handler: (req, res) => req.session.destroy(res.redirect.bind(res, '/')) }
    ];
    /* redirect routes */
    const redirects = [
      { from: '/signin', to: '/login' },
      { from: '/signup', to: '/join' },
      { from: '/signout', to: '/logout' },
    ];

    routes.forEach(({ path, handler, method = 'get' }) => app[method](path, handler));

    redirects.forEach(({ from, to, method = 'get', statusCode = 303 }) => 
      app[method](from, (req, res) => res.redirect(statusCode, to)));

    app.get('*', nextHandler); // keep this here, catch all pages not specified in routes and redirects

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  });
