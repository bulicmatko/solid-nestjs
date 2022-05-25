import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

import { UnprocessableField } from "../user-interface/outputs/unprocessable.output";

type RecursiveUnprocessableField =
  | UnprocessableField
  | RecursiveUnprocessableField[];

function toUnprocessable(error: ValidationError): RecursiveUnprocessableField {
  if (error.children && error.children.length > 0) {
    return error.children.map(toUnprocessable);
  }

  return new UnprocessableField({
    name: error.property,
    message: Object.values(error.constraints || [])[0],
  });
}

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      // NOTE: Next lines are commented because
      // we're using custom input validation pipes
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new BadRequestException(errors.flatMap(toUnprocessable)),
    });
  }
}
