import chalk from 'chalk';

export default (server) => {
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    console.log(chalk.white(`${socket.id} is connected`));
  });
};
