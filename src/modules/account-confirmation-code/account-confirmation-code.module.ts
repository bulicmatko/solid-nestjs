import { Module } from "@nestjs/common";

import { PrismaModule } from "@core/modules/prisma";
import { ValidatorModule } from "@core/modules/validator";

import { AccountConfirmationCodeGenerateService } from "./account-confirmation-code-generate.service";
import { AccountConfirmationCodeValidateService } from "./account-confirmation-code-validate.service";

@Module({
  imports: [PrismaModule, ValidatorModule],
  providers: [
    AccountConfirmationCodeGenerateService,
    AccountConfirmationCodeValidateService,
  ],
  exports: [
    AccountConfirmationCodeGenerateService,
    AccountConfirmationCodeValidateService,
  ],
})
export class AccountConfirmationCodeModule {}
