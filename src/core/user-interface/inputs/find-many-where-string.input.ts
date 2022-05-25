import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

import { UnprocessableFieldCode } from "../outputs/unprocessable.output";

@InputType()
export class FindManyWhereString {
  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly equals?: string;

  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly not?: string;

  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly contains?: string;

  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly startsWith?: string;

  @IsString({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly endsWith?: string;

  @IsString({ each: true, message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [String], { nullable: true })
  readonly in?: string[];

  @IsString({ each: true, message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [String], { nullable: true })
  readonly notIn?: string[];
}
