import { Injectable } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

import { PrismaService } from "../../../../core/modules/prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistingEmailConfirmationCodeConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(code: string): Promise<boolean> {
    const emailConfirmationRequest =
      await this.prisma.emailConfirmationRequest.findUnique({
        where: { code },
        select: { id: true },
      });

    return Boolean(emailConfirmationRequest);
  }

  defaultMessage(): string {
    return "code invalid";
  }
}

export function IsExistingEmailConfirmationCode(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingEmailConfirmationCodeConstraint,
    });
}
