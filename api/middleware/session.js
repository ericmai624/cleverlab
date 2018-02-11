import redis from 'redis';
import session from 'express-session';
import createRedisStore from 'connect-redis';
import config from 'config';
import url from 'url';
import chalk from 'chalk';

let client;
if (process.env.REDISTOGO_URL) {
  let rtg = url.parse(process.env.REDISTOGO_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  client = redis.createClient(6379, config.redis.host);
}

client.on('ready', () => console.log(chalk.bgGreen(chalk.black('Redis is ready to accept connections'))));

const RedisStore = createRedisStore(session);

export default session({
  store: new RedisStore({ client }),
  secret: 'cleverlab',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: { maxAge: 3 * 24 * 3600 * 1000 }
});
