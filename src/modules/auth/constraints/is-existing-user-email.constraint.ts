import { Injectable } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { PrismaService } from "../../prisma/services/prisma.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistingUserEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: { id: true },
    });

    return Boolean(user);
  }

  defaultMessage(): string {
    return "user email does not exist";
  }
}
