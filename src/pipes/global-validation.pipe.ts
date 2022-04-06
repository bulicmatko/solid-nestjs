import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

import { BadRequestField } from "../user-interface/outputs/bad-request.output";

type RecursiveBadRequestField = BadRequestField | RecursiveBadRequestField[];

function toBadRequest(error: ValidationError): RecursiveBadRequestField {
  if (error.children && error.children.length > 0) {
    return error.children.map(toBadRequest);
  }

  return new BadRequestField({
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
        new BadRequestException(errors.flatMap(toBadRequest)),
    });
  }
}
