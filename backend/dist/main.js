"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_js_1 = require("./app.module.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule);
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
    app.setGlobalPrefix("api");
    const port = process.env.PORT ?? 3000;
    await app.listen(port, "0.0.0.0");
    console.log(`🚀 Server running on http://136.115.251.199:${port}/api`);
}
void bootstrap();
//# sourceMappingURL=main.js.map