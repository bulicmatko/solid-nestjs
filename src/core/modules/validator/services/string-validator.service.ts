import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import {
  isDefined,
  length as isLength,
  maxLength as isMaxLength,
  minLength as isMinLength,
  isString,
} from "class-validator";

import { ErrorCode, Validator } from "../utils/validation.utils";

interface StringValidatorOptions {
  readonly nullable?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly len?: number;
  readonly exact?: string;
}

@Injectable()
export class StringValidatorService implements Validator<string> {
  async validate(
    value: unknown,
    options?: StringValidatorOptions & { nullable?: false },
  ): Promise<string>;

  async validate(
    value: unknown,
    options?: StringValidatorOptions & { nullable: true },
  ): Promise<string | undefined>;

  async validate(
    value: unknown,
    { nullable, min, max, len, exact }: StringValidatorOptions = {},
  ): Promise<string | undefined> {
    if (nullable && !isDefined(value)) {
      return undefined;
    }

    if (!isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isString(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (min && !isMinLength(value, min)) {
      throw new UnprocessableEntityException(ErrorCode.MIN);
    }

    if (max && !isMaxLength(value, max)) {
      throw new UnprocessableEntityException(ErrorCode.MAX);
    }

    if (len && !isLength(value, len)) {
      throw new UnprocessableEntityException(ErrorCode.LENGTH);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    return value as string;
  }
}
