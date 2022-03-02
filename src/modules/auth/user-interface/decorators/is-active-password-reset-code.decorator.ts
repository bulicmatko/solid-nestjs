import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { isAfter } from "date-fns";

import { PrismaService } from "../../../prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsActivePasswordResetCodeConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(code: string): Promise<boolean> {
    const passwordResetRequest =
      await this.prisma.passwordResetRequest.findUnique({
        where: { code },
        select: { expiresAt: true },
      });

    if (!passwordResetRequest) {
      throw new InternalServerErrorException();
    }

    return isAfter(passwordResetRequest.expiresAt, new Date());
  }

  defaultMessage(): string {
    return "code expired";
  }
}

export function IsActivePasswordResetCode(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsActivePasswordResetCodeConstraint,
    });
}
