import { Injectable } from "@nestjs/common";

import { PrismaService } from "@core/modules/prisma";
import { ObjectValidatorService } from "@core/modules/validator";

import { AccountEmailValidateService } from "@modules/account-email";
import { AccountPasswordValidateService } from "@modules/account-password";
import { AccountConfirmationCodeGenerateService } from "@modules/account-confirmation-code";

interface AccountCreateInput {
  readonly email: string;
  readonly password: string;
}

interface CreatedAccount {
  readonly id: string;
}

@Injectable()
export class AccountCreateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly input: ObjectValidatorService,
    private readonly email: AccountEmailValidateService,
    private readonly password: AccountPasswordValidateService,
    private readonly code: AccountConfirmationCodeGenerateService,
  ) {}

  async createAccount(input: AccountCreateInput): Promise<CreatedAccount> {
    const { email, password } = await this.input.validate<AccountCreateInput>({
      email: this.email.validate(input.email, { checkUniqueness: true }),
      password: this.password.validate(input.password),
    });

    const { code, expiresAt } = await this.code.generate();

    return this.prisma.user.create({
      data: {
        email,
        password,
        confirmationRequest: {
          create: { code, expiresAt },
        },
      },
      select: { id: true },
    });
  }
}
