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
export class IsExistingEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return Boolean(user);
  }

  defaultMessage(): string {
    return "email does not exist";
  }
}

export function IsExistingEmail(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsExistingEmailConstraint,
    });
}
