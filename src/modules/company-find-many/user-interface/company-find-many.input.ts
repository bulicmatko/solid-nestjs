import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

import { FindManyWhereString } from "../../../core/user-interface/inputs/find-many-where-string.input";
import { FindManyOrderDirection } from "../../../core/user-interface/inputs/find-many-order-direction.input";

@InputType()
class CompanyFindManyWhere {
  @Field(() => FindManyWhereString, { nullable: true })
  readonly name?: FindManyWhereString;
}

@InputType()
class CompanyFindManyOrderBy {
  @Field(() => FindManyOrderDirection, { nullable: true })
  readonly name?: FindManyOrderDirection;
}

@InputType()
export class CompanyFindManyFilter {
  @Field(() => CompanyFindManyWhere, { nullable: true })
  readonly where?: CompanyFindManyWhere;

  @Field(() => CompanyFindManyOrderBy, { nullable: true })
  readonly orderBy?: CompanyFindManyOrderBy;

  @Field(() => Int, { nullable: true })
  readonly take?: number;

  @Field(() => String, { nullable: true })
  readonly after?: string;
}

@ArgsType()
export class CompanyFindManyArgs {
  @Field(() => CompanyFindManyFilter, { nullable: true })
  readonly filter?: CompanyFindManyFilter;
}
