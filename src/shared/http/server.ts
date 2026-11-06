import 'reflect-metadata';
import { app } from './app';
import { connectDatabase } from '../typeorm';

async function start(): Promise<void> {
  try {
    await connectDatabase();
    const port = Number(process.env.PORT) || 3333;
    app.listen(port, '0.0.0.0', () => {
      console.log(`server is running! ${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar a API: conexao com o banco nao estabelecida.', error);
    process.exit(1);
  }
}

start();
