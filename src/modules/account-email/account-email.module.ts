import { Module } from "@nestjs/common";

import { PrismaModule } from "@core/modules/prisma";
import { ValidatorModule } from "@core/modules/validator";

import { AccountEmailValidateService } from "./account-email-validate.service";

@Module({
  imports: [PrismaModule, ValidatorModule],
  providers: [AccountEmailValidateService],
  exports: [AccountEmailValidateService],
})
export class AccountEmailModule {}
