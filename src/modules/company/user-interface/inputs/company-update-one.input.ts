import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CompanyUpdateOneData {
  @Field(() => String, { nullable: true })
  readonly name?: string;
}

@ArgsType()
export class CompanyUpdateOneArgs {
  @Field(() => ID)
  readonly id: string;

  @Field(() => CompanyUpdateOneData)
  readonly data: CompanyUpdateOneData;
}
