import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { isAfter } from "date-fns";

import { PrismaService } from "../../../modules/prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNotExpiredEmailConfirmationCodeConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(code: string): Promise<boolean> {
    const emailConfirmationRequest =
      await this.prisma.emailConfirmationRequest.findUnique({
        where: { code },
        select: { expiresAt: true },
      });

    if (!emailConfirmationRequest) {
      throw new InternalServerErrorException();
    }

    return isAfter(emailConfirmationRequest.expiresAt, new Date());
  }

  defaultMessage(): string {
    return "code expired";
  }
}

export function IsNotExpiredEmailConfirmationCode(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotExpiredEmailConfirmationCodeConstraint,
    });
}
