import { Module } from "@nestjs/common";

import { ValidatorModule } from "@core/modules/validator";

import { PrismaModule } from "../../prisma/prisma.module";

import { AccountEmailValidatorService } from "../services/account-email-validator.service";

@Module({
  imports: [ValidatorModule, PrismaModule],
  providers: [AccountEmailValidatorService],
  exports: [AccountEmailValidatorService],
})
export class AccountEmailModule {}
