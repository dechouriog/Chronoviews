// Por Leidy Obando

// External imports
import { NestFactory } from "@nestjs/core";

// Internal imports
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3001",
      "http://136.115.251.199",
      "http://136.115.251.199:80",
    ],
  });

  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
