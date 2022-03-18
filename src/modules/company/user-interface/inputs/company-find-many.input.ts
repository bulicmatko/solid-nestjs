import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { FindManyWhereString } from "../../../../user-interface/inputs/find-many-where-string.input";
import { FindManyOrderDirection } from "../../../../user-interface/inputs/find-many-order-direction.input";

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

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly take?: number;

  @IsUUID()
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly after?: string;
}

@ArgsType()
export class CompanyFindManyArgs {
  @ValidateNested({ each: true })
  @Type(() => CompanyFindManyFilter)
  @Field(() => CompanyFindManyFilter, { nullable: true })
  readonly filter?: CompanyFindManyFilter;
}
