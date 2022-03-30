import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class CompanyRecoverOneArgs {
  @Field(() => ID)
  readonly id: string;
}
