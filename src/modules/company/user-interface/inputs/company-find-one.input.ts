import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class CompanyFindOneArgs {
  @Field(() => ID)
  readonly id: string;
}
