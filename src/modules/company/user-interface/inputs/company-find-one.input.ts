import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsDefined, IsString, IsUUID } from "class-validator";

@ArgsType()
export class CompanyFindOneArgs {
  @IsUUID()
  @IsString()
  @IsDefined()
  @Field(() => ID)
  readonly id: string;
}
