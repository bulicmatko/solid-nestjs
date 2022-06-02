import { Injectable } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

import { PrismaService } from "../../../modules/prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !user;
  }

  defaultMessage(): string {
    return "email not unique";
  }
}

export function IsUniqueEmail(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
}
