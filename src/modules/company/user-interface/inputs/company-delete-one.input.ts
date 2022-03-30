import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class CompanyDeleteOneArgs {
  @Field(() => ID)
  readonly id: string;
}
