import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import express from 'express';
import { userRouter } from './routes/userRouter';
import { imageRouter } from './routes/imageRouter';
import { followRouter } from './routes/followRouter';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use('/image', imageRouter);

app.use('/follow', followRouter);

const server = app.listen(process.env.DB_PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
