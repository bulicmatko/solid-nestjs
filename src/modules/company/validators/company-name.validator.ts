import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { isDefined, isString, maxLength, minLength } from "class-validator";

import { ErrorCode, Validator } from "../../../utils/validator.util";

import { PrismaService } from "../../prisma/services/prisma.service";

@Injectable()
export class CompanyNameValidator implements Validator<string> {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: unknown, id?: string): Promise<string> {
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

    if (!(await this.isUnique(value, id))) {
      throw new UnprocessableEntityException(ErrorCode.NOT_UNIQUE);
    }

    return value;
  }

  private async isUnique(name: string, id?: string): Promise<boolean> {
    const existingCompany = await this.prisma.company.findFirst({
      where: { name, id: id ? { notIn: [id] } : undefined },
      select: { id: true },
    });

    return Boolean(existingCompany);
  }
}
