import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 8080;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("Bot telegram")
    .setDescription("For my students")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log("PORT:", PORT));
}

bootstrap();
