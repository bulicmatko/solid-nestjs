import { Module } from "@nestjs/common";

import { AccountModule } from "@modules/account";

import { AccountConfirmResolver } from "./account-confirm.resolver";

@Module({
  imports: [AccountModule],
  providers: [AccountConfirmResolver],
})
export class AccountConfirmModule {}
