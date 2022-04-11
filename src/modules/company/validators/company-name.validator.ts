import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDefined, isString, maxLength, minLength } from "class-validator";

import { ErrorCode, Validator } from "../../../utils/validator.util";

import { PrismaService } from "../../prisma/services/prisma.service";

interface CompanyIdValidatorMeta {
  readonly companyId?: string;
}

@Injectable()
export class CompanyNameValidator implements Validator<string> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    value: unknown,
    { companyId }: CompanyIdValidatorMeta = {},
  ): Promise<string> {
    if (!isDefined(value)) {
      throw new UnprocessableEntityException(ErrorCode.REQUIRED);
    }

    if (!isString(value)) {
      throw new UnprocessableEntityException(ErrorCode.INVALID);
    }

    if (!minLength(value, 2)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_SHORT);
    }

    if (!maxLength(value, 32)) {
      throw new UnprocessableEntityException(ErrorCode.TOO_LONG);
    }

    if (!(await this.isUnique(value, { companyId }))) {
      throw new UnprocessableEntityException(ErrorCode.NOT_UNIQUE);
    }

    return value;
  }

  private async isUnique(
    name: string,
    { companyId }: CompanyIdValidatorMeta,
  ): Promise<boolean> {
    const existingCompany = await this.prisma.company.findFirst({
      where: { name, id: companyId ? { notIn: [companyId] } : undefined },
      select: { id: true },
    });

    return !existingCompany;
  }
}
