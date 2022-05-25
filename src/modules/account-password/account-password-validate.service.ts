import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import {
  isDefined,
  maxLength as isMaxLength,
  minLength as isMinLength,
  isString,
} from "class-validator";

import { ErrorCode, Validator } from "@core/modules/validator";

interface AccountPasswordValidateOptions {
  readonly nullable?: boolean;
  readonly exact?: string;
}

@Injectable()
export class AccountPasswordValidateService implements Validator<string> {
  async validate(
    value: unknown,
    options?: AccountPasswordValidateOptions & { nullable?: false },
  ): Promise<string>;

  async validate(
    value: unknown,
    options?: AccountPasswordValidateOptions & { nullable: true },
  ): Promise<string | undefined>;

  async validate(
    value: unknown,
    { nullable, exact }: AccountPasswordValidateOptions = {},
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

    if (!isMinLength(value, 8)) {
      throw new UnprocessableEntityException(ErrorCode.MIN);
    }

    if (!isMaxLength(value, 72)) {
      throw new UnprocessableEntityException(ErrorCode.MAX);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    return value;
  }
}
