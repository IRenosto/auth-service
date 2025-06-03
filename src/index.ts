import { server } from './server';

server.listen(process.env.PORT, async () => {
  console.log(`Auth Service rodando no endereço: http://${process.env.HOST}:${process.env.PORT}\n`);
});