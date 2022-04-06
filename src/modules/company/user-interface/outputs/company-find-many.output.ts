import { Field, ObjectType, createUnionType } from "@nestjs/graphql";

import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";
import { Unprocessable } from "../../../../user-interface/outputs/unprocessable.output";

import { Company } from "./company.output";

@ObjectType()
class CompanyEdge {
  @Field(() => Company)
  readonly node: Company;

  @Field(() => String)
  readonly cursor: string;
}

@ObjectType()
class CompanyPageInfo {
  @Field(() => String, { nullable: true })
  readonly endCursor: string | null;

  @Field(() => Boolean)
  readonly hasNextPage: boolean;
}

@ObjectType()
export class CompanyConnection {
  @Field(() => [CompanyEdge])
  readonly edges: CompanyEdge[];

  @Field(() => CompanyPageInfo)
  readonly pageInfo: CompanyPageInfo;

  constructor(data: CompanyConnection) {
    Object.assign(this, data);
  }
}

export const CompanyFindManyResult = createUnionType({
  name: "CompanyFindManyResult",
  types: () => [Forbidden, Unprocessable, CompanyConnection],
});
