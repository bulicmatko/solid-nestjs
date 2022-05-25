import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { isAfter } from "date-fns";

import { PrismaService } from "../../../../core/modules/prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNotConfirmedEmailConstraint
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

    return !user.confirmedAt || isAfter(user.confirmedAt, new Date());
  }

  defaultMessage(): string {
    return "email confirmed";
  }
}

export function IsNotConfirmedEmail(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotConfirmedEmailConstraint,
    });
}
