import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  app.enableCors({
    origin: 'http://localhost:5173',
  });

=======
>>>>>>> 53e9146d0e9edf35081b231c1dfd83629b09dd30
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
