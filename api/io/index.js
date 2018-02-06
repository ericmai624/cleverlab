import chalk from 'chalk';
import Server from 'socket.io';

const io = new Server();

io.on('connection', socket => {
  console.log(chalk.white(`${socket.id} is connected`));
});

export default io;