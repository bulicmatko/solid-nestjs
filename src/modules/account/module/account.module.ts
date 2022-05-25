import { Module } from "@nestjs/common";

import { ValidatorModule } from "@core/modules/validator";

import { AccountEmailModule } from "@modules/account-email";

import { PrismaModule } from "../../prisma/prisma.module";

import { AccountCreateService } from "../services/account-create.service";

@Module({
  imports: [ValidatorModule, AccountEmailModule, PrismaModule],
  providers: [AccountCreateService],
  exports: [AccountCreateService],
})
export class AccountModule {}
