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

import { BadRequestCode } from "../../../../user-interface/outputs/bad-request.output";

import { IsExistingCompany } from "../decorators/is-existing-company.decorator";
import { IsUniqueCompanyName } from "../decorators/is-unique-company-name.decorator";

@InputType()
export class CompanyUpdateOneInput {
  @IsExistingCompany({ message: BadRequestCode.NOT_FOUND })
  @IsUUID("4", { message: BadRequestCode.INVALID })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  @Field(() => ID)
  readonly id: string;

  @IsUniqueCompanyName({ message: BadRequestCode.NOT_UNIQUE })
  @MaxLength(32, { message: BadRequestCode.TOO_LONG })
  @MinLength(2, { message: BadRequestCode.TOO_SHORT })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => String)
  readonly name: string;
}

@ArgsType()
export class CompanyUpdateOneArgs {
  @ValidateNested({ each: true })
  @Type(() => CompanyUpdateOneInput)
  @Field(() => CompanyUpdateOneInput)
  readonly input: CompanyUpdateOneInput;
}
