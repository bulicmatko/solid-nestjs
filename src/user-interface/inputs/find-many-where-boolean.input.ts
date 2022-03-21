import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

import { BadRequestCode } from "../outputs/bad-request.output";

@InputType()
export class FindManyWhereBoolean {
  @IsBoolean({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Boolean, { nullable: true })
  readonly equals?: boolean;

  @IsBoolean({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Boolean, { nullable: true })
  readonly not?: boolean;
}
