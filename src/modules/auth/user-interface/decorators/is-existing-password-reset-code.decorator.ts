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
export class IsExistingPasswordResetCodeConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(code: string): Promise<boolean> {
    const passwordResetRequest =
      await this.prisma.passwordResetRequest.findUnique({
        where: { code },
        select: { id: true },
      });

    return Boolean(passwordResetRequest);
  }

  defaultMessage(): string {
    return "code invalid";
  }
}

export function IsExistingPasswordResetCode(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingPasswordResetCodeConstraint,
    });
}
