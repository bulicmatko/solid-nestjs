import { Field, Int, ObjectType, createUnionType } from "@nestjs/graphql";

import { BadRequest } from "../../../../user-interface/outputs/bad-request.output";
import { Forbidden } from "../../../../user-interface/outputs/forbidden.output";

import { Company } from "./company.output";

@ObjectType()
class CompanyEdge {
  @Field(() => Company)
  readonly node: Company;

  @Field(() => Int)
  readonly cursor: number;
}

@ObjectType()
class CompanyPageInfo {
  @Field(() => Int, { nullable: true })
  readonly endCursor: number | null;

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
  types: () => [Forbidden, BadRequest, CompanyConnection],
});
