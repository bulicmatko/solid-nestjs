import { NestFactory } from "@nestjs/core";
import { NestExpressApplication as NestApp } from "@nestjs/platform-express";
import { useContainer } from "class-validator";

// import { GlobalValidationPipe } from "./pipes/global-validation.pipe";
import { GlobalExceptionFilter } from "./filter/global-exception.filter";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestApp>(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  // app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(8000);
}

bootstrap();
