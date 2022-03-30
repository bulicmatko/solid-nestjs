import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class CompanyCreateOneData {
  @Field(() => String)
  readonly name: string;
}

@ArgsType()
export class CompanyCreateOneArgs {
  @Field(() => CompanyCreateOneData)
  readonly data: CompanyCreateOneData;
}
