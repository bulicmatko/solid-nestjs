import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@core/modules/prisma";
import { ObjectValidatorService } from "@core/modules/validator";

import { AccountConfirmationCodeValidateService } from "@modules/account-confirmation-code";

interface AccountConfirmInput {
  readonly confirmationCode: string;
}

interface ConfirmedAccount {
  readonly id: string;
}

@Injectable()
export class AccountConfirmService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly input: ObjectValidatorService,
    private readonly code: AccountConfirmationCodeValidateService,
  ) {}

  async confirmAccount(input: AccountConfirmInput): Promise<ConfirmedAccount> {
    const { confirmationCode } = await this.input.validate<AccountConfirmInput>(
      {
        confirmationCode: this.code.validate(input.confirmationCode, {
          checkExistence: true,
          checkExpiration: true,
        }),
      },
    );

    const accountEmailConfirmationRequest =
      await this.prisma.accountEmailConfirmationRequest.findFirst({
        where: { confirmationCode, expiresAt: { gte: new Date() } },
        select: { id: true, accountId: true },
      });

    if (!accountEmailConfirmationRequest) {
      throw new InternalServerErrorException("Confirmation request not found!");
    }

    const confirmedAccount = await this.prisma.account.update({
      where: { id: accountEmailConfirmationRequest.accountId },
      data: { confirmedAt: new Date() },
      select: { id: true },
    });

    await this.prisma.accountEmailConfirmationRequest.delete({
      where: { id: accountEmailConfirmationRequest.id },
      select: { id: true },
    });

    return confirmedAccount;
  }
}
