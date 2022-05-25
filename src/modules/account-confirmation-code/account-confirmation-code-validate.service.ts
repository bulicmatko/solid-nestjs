import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDefined, isString, isUUID } from "class-validator";

import { PrismaService } from "@core/modules/prisma";
import { ErrorCode, Validator } from "@core/modules/validator";

interface AccountConfirmationCodeValidateOptions {
  readonly nullable?: boolean;
  readonly checkExistence?: boolean;
  readonly checkExpiration?: boolean;
  readonly exact?: string;
}

@Injectable()
export class AccountConfirmationCodeValidateService
  implements Validator<string>
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    value: unknown,
    options?: AccountConfirmationCodeValidateOptions & { nullable?: false },
  ): Promise<string>;

  async validate(
    value: unknown,
    options?: AccountConfirmationCodeValidateOptions & { nullable: true },
  ): Promise<string | undefined>;

  async validate(
    value: unknown,
    {
      nullable,
      checkExistence,
      checkExpiration,
      exact,
    }: AccountConfirmationCodeValidateOptions = {},
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

    if (!isUUID(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (isDefined(exact) && value !== exact) {
      throw new UnprocessableEntityException(ErrorCode.MISMATCH);
    }

    if (checkExistence && !(await this.isExisting(value))) {
      throw new UnprocessableEntityException(ErrorCode.NOT_FOUND);
    }

    if (checkExpiration && !(await this.isValid(value))) {
      throw new UnprocessableEntityException(ErrorCode.EXPIRED);
    }

    return value;
  }

  private async isExisting(code: string): Promise<boolean> {
    const accountConfirmationRequest =
      await this.prisma.accountConfirmationRequest.findUnique({
        where: { code },
        select: { id: true },
      });

    return Boolean(accountConfirmationRequest);
  }

  private async isValid(code: string): Promise<boolean> {
    const accountConfirmationRequest =
      await this.prisma.accountConfirmationRequest.findFirst({
        where: { code, expiresAt: { gte: new Date() } },
        select: { id: true },
      });

    return Boolean(accountConfirmationRequest);
  }
}
