import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { AccountCreateService } from "@modules/account";

import { AccountCreateArgs } from "./account-create.input";
import {
  AccountCreateOutput,
  AccountCreateSuccess,
} from "./account-create.output";

@Resolver()
export class AccountCreateResolver {
  constructor(private readonly account: AccountCreateService) {}

  @Mutation(() => AccountCreateOutput)
  async accountCreate(
    @Args({ type: () => AccountCreateArgs })
    { input }: AccountCreateArgs,
  ): Promise<AccountCreateSuccess> {
    await this.account.createAccount(input);

    return new AccountCreateSuccess({
      success: true,
    });
  }
}
