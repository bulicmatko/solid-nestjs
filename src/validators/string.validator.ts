import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import {
  isDefined,
  length as isLength,
  maxLength as isMaxLength,
  minLength as isMinLength,
  isString,
} from "class-validator";

import { ErrorCode, Validator } from "../utils/validator.util";

interface StringValidatorMeta {
  readonly nullable?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly length?: number;
}

@Injectable()
export class StringValidator implements Validator<string> {
  async validate(
    value: unknown,
    { nullable, length, minLength, maxLength }: StringValidatorMeta,
  ): Promise<string> {
    if (!nullable && !isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isString(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (minLength && isMinLength(value, minLength)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_SHORT);
    }

    if (maxLength && isMaxLength(value, maxLength)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_LONG);
    }

    if (length && isLength(value, length)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_LONG);
    }

    return value;
  }
}
