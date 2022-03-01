import { Logger } from "@nestjs/common";
import { validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

interface ClassType<T = object> {
  new (...args: object[]): T;
}

const logger = new Logger("ConfigValidator");

export function validate(ConfigClass: ClassType) {
  return (config: Record<string, unknown>): object => {
    const configClass = plainToClass(ConfigClass, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(configClass, {
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) => {
        if (!error.constraints) {
          return [`${error.property} has invalid config validator`];
        }

        return Object.values(error.constraints);
      });

      errorMessages.map((message) => logger.error(`💥 ${message}`));

      return process.exit(1);
    }

    return configClass;
  };
}
