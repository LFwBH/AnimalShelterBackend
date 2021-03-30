import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from "compression";
import * as helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV !== "testing",
  });

  app.use(helmet());
  app.use(compression());

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
