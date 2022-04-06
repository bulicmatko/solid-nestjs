import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

import { UnprocessableFieldCode } from "../outputs/unprocessable.output";

@InputType()
export class FindManyWhereBoolean {
  @IsBoolean({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Boolean, { nullable: true })
  readonly equals?: boolean;

  @IsBoolean({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Boolean, { nullable: true })
  readonly not?: boolean;
}
