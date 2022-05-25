import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class AccountConfirmInput {
  @Field(() => String)
  readonly code: string;
}

@ArgsType()
export class AccountConfirmArgs {
  @Field(() => AccountConfirmInput)
  readonly input: AccountConfirmInput;
}
