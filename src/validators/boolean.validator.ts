import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isBoolean, isDefined } from "class-validator";

import { ErrorCode, Validator } from "../utils/validator.util";

interface BooleanValidatorMeta {
  readonly nullable?: boolean;
}

@Injectable()
export class BooleanValidator implements Validator<boolean> {
  async validate(
    value: unknown,
    { nullable }: BooleanValidatorMeta,
  ): Promise<boolean> {
    if (!nullable && !isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isBoolean(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    return value as boolean;
  }
}
