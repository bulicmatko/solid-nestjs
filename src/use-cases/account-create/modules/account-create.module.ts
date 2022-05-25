import { Module } from "@nestjs/common";

import { AccountModule } from "@modules/account";

import { AccountCreateResolver } from "../user-interface/account-create.resolver";

@Module({
  imports: [AccountModule],
  providers: [AccountCreateResolver],
})
export class AccountCreateModule {}
