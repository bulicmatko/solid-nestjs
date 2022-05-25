import { Injectable } from "@nestjs/common";

import {
  ObjectValidatorService,
  StringValidatorService,
} from "@core/modules/validator";

import { AccountEmailValidatorService } from "@modules/account-email";

import { PrismaService } from "../../prisma/services/prisma.service";

interface AccountCreateInput {
  readonly email: string;
  readonly password: string;
}

interface CreatedAccount {
  readonly id: string;
  readonly email: string;
}

@Injectable()
export class AccountCreateService {
  constructor(
    private readonly input: ObjectValidatorService,
    private readonly string: StringValidatorService,
    private readonly email: AccountEmailValidatorService,
    private readonly prisma: PrismaService,
  ) {}

  async createAccount(input: AccountCreateInput): Promise<CreatedAccount> {
    const { email, password } = await this.input.validate<AccountCreateInput>({
      email: this.email.validate(input.email, { checkUniqueness: true }),
      password: this.string.validate(input.password, { min: 8, max: 72 }),
    });

    return this.prisma.user.create({
      data: { email, password },
      select: { id: true, email: true },
    });
  }
}
