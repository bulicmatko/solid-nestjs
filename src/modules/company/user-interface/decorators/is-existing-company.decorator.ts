import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

import { PrismaService } from "../../../prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistingCompanyConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: string): Promise<boolean> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException();
    }

    return true;
  }

  defaultMessage(): string {
    return "company does not exist";
  }
}

export function IsExistingCompany(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsExistingCompanyConstraint,
    });
}
