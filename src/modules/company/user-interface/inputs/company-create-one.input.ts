import { ArgsType, Field, InputType } from "@nestjs/graphql";
import {
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { BadRequestCode } from "../../../../user-interface/outputs/bad-request.output";

import { IsUniqueCompanyName } from "../decorators/is-unique-company-name.decorator";

@InputType()
export class CompanyCreateOneInput {
  @IsUniqueCompanyName({ message: BadRequestCode.NOT_UNIQUE })
  @MaxLength(32, { message: BadRequestCode.TOO_LONG })
  @MinLength(2, { message: BadRequestCode.TOO_SHORT })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  @Field(() => String)
  readonly name: string;
}

@ArgsType()
export class CompanyCreateOneArgs {
  @ValidateNested({ each: true })
  @Type(() => CompanyCreateOneInput)
  @Field(() => CompanyCreateOneInput)
  readonly input: CompanyCreateOneInput;
}
