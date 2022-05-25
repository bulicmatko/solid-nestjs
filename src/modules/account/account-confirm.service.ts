import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "@core/modules/prisma";
import { ObjectValidatorService } from "@core/modules/validator";

import { AccountConfirmationCodeValidateService } from "@modules/account-confirmation-code";

interface AccountConfirmInput {
  readonly code: string;
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
    const { code } = await this.input.validate<AccountConfirmInput>({
      code: this.code.validate(input.code, {
        checkExistence: true,
        checkExpiration: true,
      }),
    });

    const accountConfirmationRequest =
      await this.prisma.accountConfirmationRequest.findFirst({
        where: { code, expiresAt: { gte: new Date() } },
        select: { id: true, userId: true },
      });

    if (!accountConfirmationRequest) {
      throw new InternalServerErrorException("Confirmation request not found!");
    }

    const confirmedAccount = await this.prisma.user.update({
      where: { id: accountConfirmationRequest.userId },
      data: { confirmedAt: new Date() },
      select: { id: true },
    });

    await this.prisma.accountConfirmationRequest.delete({
      where: { id: accountConfirmationRequest.id },
      select: { id: true },
    });

    return confirmedAccount;
  }
}
