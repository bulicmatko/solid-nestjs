import { Module } from "@nestjs/common";

import { AccountModule } from "@modules/account";

import { AccountCreateResolver } from "./account-create.resolver";

@Module({
  imports: [AccountModule],
  providers: [AccountCreateResolver],
})
export class AccountCreateModule {}
