import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Cluster } from './cluster';
import { loadGlobalMiddleWare } from './middlewares/global.middleware';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  loadGlobalMiddleWare(app);
  await app.listen(port);
}
Cluster.register(4, bootstrap);
