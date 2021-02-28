import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('"Маленькие друзья с большим сердцем"')
    .setDescription(
      'HTTP REST API для приюта "Маленькие друзья с большим сердцем"',
    )
    .setVersion("1.0")
    .addTag("pets")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(0);
});
