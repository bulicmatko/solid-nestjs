import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import { IsDefined, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { BadRequestCode } from "../../../../user-interface/outputs/bad-request.output";

import { IsExistingCompany } from "../decorators/is-existing-company.decorator";

@InputType()
export class CompanyDeleteOneInput {
  @IsExistingCompany({ message: BadRequestCode.NOT_FOUND })
  @IsUUID("4", { message: BadRequestCode.INVALID })
  @IsString({ message: BadRequestCode.INVALID })
  @IsDefined({ message: BadRequestCode.REQUIRED })
  @Field(() => ID)
  readonly id: string;
}

@ArgsType()
export class CompanyDeleteOneArgs {
  @ValidateNested({ each: true })
  @Type(() => CompanyDeleteOneInput)
  @Field(() => CompanyDeleteOneInput)
  readonly input: CompanyDeleteOneInput;
}
