import { Injectable } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

import { PrismaService } from "../../../prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueCompanyNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(name: string): Promise<boolean> {
    const company = await this.prisma.company.findFirst({
      where: { name },
      select: { id: true },
    });

    return !company;
  }

  defaultMessage(): string {
    return "company name already exist";
  }
}

export function IsUniqueCompanyName(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsUniqueCompanyNameConstraint,
    });
}
