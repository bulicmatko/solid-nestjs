import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";

import { IsUniqueCompanyName } from "../decorators/is-unique-company-name.decorator";

@InputType()
export class CompanyUpdateOneData {
  @IsUniqueCompanyName()
  @MaxLength(32)
  @MinLength(2)
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly name?: string;
}

@ArgsType()
export class CompanyUpdateOneArgs {
  @IsInt()
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @Field(() => ID)
  readonly id: number;

  @ValidateNested({ each: true })
  @Type(() => CompanyUpdateOneData)
  @Field(() => CompanyUpdateOneData)
  readonly data: CompanyUpdateOneData;
}
