import { Field, ObjectType, createUnionType } from "@nestjs/graphql";

import { Unprocessable } from "../../../core/user-interface/outputs/unprocessable.output";

@ObjectType()
export class AccountCreateSuccess {
  @Field(() => Boolean)
  readonly success: boolean;

  constructor(data: AccountCreateSuccess) {
    Object.assign(this, data);
  }
}

export const AccountCreateOutput = createUnionType({
  name: "AccountCreateOutput",
  types: () => [Unprocessable, AccountCreateSuccess],
});
