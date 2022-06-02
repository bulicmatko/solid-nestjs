import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { isBefore } from "date-fns";

import { PrismaService } from "../../../modules/prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsConfirmedEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { confirmedAt: true },
    });

    if (!user) {
      throw new InternalServerErrorException();
    }

    return user.confirmedAt ? isBefore(user.confirmedAt, new Date()) : false;
  }

  defaultMessage(): string {
    return "email not confirmed";
  }
}

export function IsConfirmedEmail(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsConfirmedEmailConstraint,
    });
}
