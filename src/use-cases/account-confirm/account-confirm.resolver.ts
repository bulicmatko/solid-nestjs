import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { AccountConfirmService } from "@modules/account";

import { AccountConfirmArgs } from "./account-confirm.input";
import {
  AccountConfirmOutput,
  AccountConfirmSuccess,
} from "./account-confirm.output";

@Resolver()
export class AccountConfirmResolver {
  constructor(private readonly account: AccountConfirmService) {}

  @Mutation(() => AccountConfirmOutput)
  async accountConfirm(
    @Args({ type: () => AccountConfirmArgs })
    { input }: AccountConfirmArgs,
  ): Promise<AccountConfirmSuccess> {
    await this.account.confirmAccount(input);

    return new AccountConfirmSuccess({
      success: true,
    });
  }
}
