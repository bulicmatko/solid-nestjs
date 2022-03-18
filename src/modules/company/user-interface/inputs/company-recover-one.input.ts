import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsDefined, IsString, IsUUID } from "class-validator";

@ArgsType()
export class CompanyRecoverOneArgs {
  @IsUUID()
  @IsString()
  @IsDefined()
  @Field(() => ID)
  readonly id: string;
}
