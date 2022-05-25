import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDefined, isInt, max as isMax, min as isMin } from "class-validator";

import { ErrorCode, Validator } from "../utils/validation.utils";

interface IntegerValidatorOptions {
  readonly nullable?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly exact?: number;
}

@Injectable()
export class IntegerValidatorService implements Validator<number> {
  async validate(
    value: unknown,
    options?: IntegerValidatorOptions & { nullable: false | undefined },
  ): Promise<number>;

  async validate(
    value: unknown,
    options?: IntegerValidatorOptions & { nullable: true },
  ): Promise<number | undefined>;

  async validate(
    value: unknown,
    { nullable, min, max, exact }: IntegerValidatorOptions = {},
  ): Promise<number | undefined> {
    if (nullable && !isDefined(value)) {
      return undefined;
    }

    if (!isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isInt(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (min && !isMin(value, min)) {
      throw new UnprocessableEntityException(ErrorCode.MIN);
    }

    if (max && !isMax(value, max)) {
      throw new UnprocessableEntityException(ErrorCode.MAX);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    return value as number;
  }
}
