import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDefined, isEmail, isString } from "class-validator";

import { ErrorCode, Validator } from "@core/modules/validator";

import { PrismaService } from "../../prisma/services/prisma.service";

interface AccountEmailValidatorOptions {
  readonly nullable?: boolean;
  readonly checkExistence?: boolean;
  readonly checkUniqueness?: boolean;
  readonly exact?: string;
}

@Injectable()
export class AccountEmailValidatorService implements Validator<string> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    value: unknown,
    options?: AccountEmailValidatorOptions & { nullable?: false },
  ): Promise<string>;

  async validate(
    value: unknown,
    options?: AccountEmailValidatorOptions & { nullable: true },
  ): Promise<string | undefined>;

  async validate(
    value: unknown,
    {
      nullable,
      checkExistence,
      checkUniqueness,
      exact,
    }: AccountEmailValidatorOptions = {},
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

    if (!isEmail(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    if (checkExistence && !(await this.isExisting(value))) {
      throw new UnprocessableEntityException(ErrorCode.NOT_FOUND);
    }

    if (checkUniqueness && !(await this.isUnique(value))) {
      throw new UnprocessableEntityException(ErrorCode.NOT_UNIQUE);
    }

    return value as string;
  }

  private async isExisting(email: string): Promise<boolean> {
    const account = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return Boolean(account);
  }

  private async isUnique(email: string): Promise<boolean> {
    const isExisting = await this.isExisting(email);

    return !isExisting;
  }
}
