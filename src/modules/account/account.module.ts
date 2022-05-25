import { Module } from "@nestjs/common";

import { PrismaModule } from "@core/modules/prisma";
import { ValidatorModule } from "@core/modules/validator";

import { AccountConfirmationCodeModule } from "@modules/account-confirmation-code";
import { AccountEmailModule } from "@modules/account-email";
import { AccountPasswordModule } from "@modules/account-password";

import { AccountConfirmService } from "./account-confirm.service";
import { AccountCreateService } from "./account-create.service";

@Module({
  imports: [
    PrismaModule,
    ValidatorModule,

    AccountConfirmationCodeModule,
    AccountEmailModule,
    AccountPasswordModule,
  ],
  providers: [AccountConfirmService, AccountCreateService],
  exports: [AccountConfirmService, AccountCreateService],
})
export class AccountModule {}
