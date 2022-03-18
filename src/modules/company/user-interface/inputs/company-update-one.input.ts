import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import {
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

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
  @IsUUID()
  @IsString()
  @IsDefined()
  @Field(() => ID)
  readonly id: string;

  @ValidateNested({ each: true })
  @Type(() => CompanyUpdateOneData)
  @Field(() => CompanyUpdateOneData)
  readonly data: CompanyUpdateOneData;
}
