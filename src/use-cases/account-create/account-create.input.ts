import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class AccountCreateInput {
  @Field(() => String)
  readonly firstName: string;

  @Field(() => String)
  readonly lastName: string;

  @Field(() => String)
  readonly email: string;

  @Field(() => String)
  readonly password: string;
}

@ArgsType()
export class AccountCreateArgs {
  @Field(() => AccountCreateInput)
  readonly input: AccountCreateInput;
}
