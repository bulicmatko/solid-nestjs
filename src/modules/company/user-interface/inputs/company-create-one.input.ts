import { ArgsType, Field, InputType } from "@nestjs/graphql";
import {
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { IsUniqueCompanyName } from "../decorators/is-unique-company-name.decorator";

@InputType()
export class CompanyCreateOneData {
  @IsUniqueCompanyName()
  @MaxLength(32)
  @MinLength(2)
  @IsString()
  @IsDefined()
  @Field(() => String)
  readonly name: string;
}

@ArgsType()
export class CompanyCreateOneArgs {
  @ValidateNested({ each: true })
  @Type(() => CompanyCreateOneData)
  @Field(() => CompanyCreateOneData)
  readonly data: CompanyCreateOneData;
}
