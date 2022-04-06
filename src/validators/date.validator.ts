import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDate, isDefined } from "class-validator";

import { ErrorCode, Validator } from "../utils/validator.util";

interface DateValidatorMeta {
  readonly nullable?: boolean;
}

@Injectable()
export class DateValidator implements Validator<Date> {
  async validate(
    value: unknown,
    { nullable }: DateValidatorMeta,
  ): Promise<Date> {
    if (!nullable && !isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isDate(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    return value as Date;
  }
}
