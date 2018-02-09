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
    // app.use(middleware.morgan('dev'));

    /* redirect routes */
    const redirects = [
      { from: '/signin', to: '/login' },
      { from: '/signup', to: '/join' },
      { from: '/signout', to: '/logout' },
    ];

    redirects.forEach(({ from, to, method = 'get', statusCode = 303 }) => 
      app[method](from, (req, res) => res.redirect(statusCode, to)));
    
    /* data route */
    app.use('/graphql', graphqlHandler);
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

    app.get('/logout', (req, res) => req.session.destroy(res.redirect.bind(res, '/')));

    app.get('*', nextHandler);

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready to accept connections on port ${port}`);
    });
  });
