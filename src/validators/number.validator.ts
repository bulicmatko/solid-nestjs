import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import {
  isDefined,
  max as isMax,
  min as isMin,
  isNumber,
} from "class-validator";

import { ErrorCode, Validator } from "../utils/validator.util";

interface NumberValidatorMeta {
  readonly nullable?: boolean;
  readonly min?: number;
  readonly max?: number;
}

@Injectable()
export class NumberValidator implements Validator<number> {
  async validate(
    value: unknown,
    { nullable, min, max }: NumberValidatorMeta,
  ): Promise<number> {
    if (!nullable && !isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isNumber(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (min && isMin(value, min)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_SMALL);
    }

    if (max && isMax(value, max)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_BIG);
    }

    return value as number;
  }
}