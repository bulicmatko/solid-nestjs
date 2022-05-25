import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDate, isDefined } from "class-validator";
import { isAfter, isBefore } from "date-fns";

import { ErrorCode, Validator } from "../utils/validation.utils";

interface DateValidatorOptions {
  readonly nullable?: boolean;
  readonly min?: Date;
  readonly max?: Date;
  readonly exact?: Date;
}

@Injectable()
export class DateValidatorService implements Validator<Date> {
  async validate(
    value: unknown,
    options?: DateValidatorOptions & { nullable?: false },
  ): Promise<Date>;

  async validate(
    value: unknown,
    options?: DateValidatorOptions & { nullable: true },
  ): Promise<Date | undefined>;

  async validate(
    value: unknown,
    { nullable, min, max, exact }: DateValidatorOptions = {},
  ): Promise<Date | undefined> {
    if (nullable && !isDefined(value)) {
      return undefined;
    }

    if (!isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isDate(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (min && isBefore(value as Date, min)) {
      throw new UnprocessableEntityException(ErrorCode.MIN);
    }

    if (max && isAfter(value as Date, max)) {
      throw new UnprocessableEntityException(ErrorCode.MAX);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    return value as Date;
  }
}
