import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isBoolean, isDefined } from "class-validator";

import { ErrorCode, Validator } from "../utils/validation.utils";

interface BooleanValidatorOptions {
  readonly nullable?: boolean;
  readonly exact?: boolean;
}

@Injectable()
export class BooleanValidatorService implements Validator<boolean> {
  async validate(
    value: unknown,
    options?: BooleanValidatorOptions & { nullable?: false },
  ): Promise<boolean>;

  async validate(
    value: unknown,
    options?: BooleanValidatorOptions & { nullable: true },
  ): Promise<boolean | undefined>;

  async validate(
    value: unknown,
    { nullable, exact }: BooleanValidatorOptions = {},
  ): Promise<boolean | undefined> {
    if (nullable && !isDefined(value)) {
      return undefined;
    }

    if (!isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isBoolean(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    return value as boolean;
  }
}
