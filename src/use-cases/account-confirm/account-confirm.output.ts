import { Field, ObjectType, createUnionType } from "@nestjs/graphql";

import { Unprocessable } from "../../core/user-interface/outputs/unprocessable.output";

@ObjectType()
export class AccountConfirmSuccess {
  @Field(() => Boolean)
  readonly success: boolean;

  constructor(data: AccountConfirmSuccess) {
    Object.assign(this, data);
  }
}

export const AccountConfirmOutput = createUnionType({
  name: "AccountConfirmOutput",
  types: () => [Unprocessable, AccountConfirmSuccess],
});
