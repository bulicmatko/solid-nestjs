import { NestFactory } from "@nestjs/core";
import { NestExpressApplication as NestApp } from "@nestjs/platform-express";
import { useContainer } from "class-validator";

import { GlobalValidationPipe } from "./pipes/global-validation.pipe";
import { GlobalExceptionFilter } from "./filter/global-exception.filter";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const application = await NestFactory.create<NestApp>(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  useContainer(application.select(AppModule), {
    fallbackOnErrors: true,
  });

  application.useGlobalPipes(new GlobalValidationPipe());
  application.useGlobalFilters(new GlobalExceptionFilter());

  await application.listen(8000);
}

bootstrap();
