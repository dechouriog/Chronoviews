// Por Leidy Obando

// External imports
import { NestFactory } from "@nestjs/core";

// Internal imports
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Habilitar CORS (puedes restringir después)
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3001",
      "http://136.115.251.199",
      "http://136.115.251.199:80",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // 🔹 Prefijo global para rutas (/api)
  app.setGlobalPrefix("api");

  // 🔥 MUY IMPORTANTE: escuchar en 0.0.0.0
  const port = process.env.PORT ?? 3000;
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Server running on http://136.115.251.199:${port}/api`);
}

void bootstrap();