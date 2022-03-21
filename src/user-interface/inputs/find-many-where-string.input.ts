import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

import { BadRequestCode } from "../outputs/bad-request.output";

@InputType()
export class FindManyWhereString {
  @IsString({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly equals?: string;

  @IsString({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly not?: string;

  @IsString({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly contains?: string;

  @IsString({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly startsWith?: string;

  @IsString({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => String, { nullable: true })
  readonly endsWith?: string;

  @IsString({ each: true, message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [String], { nullable: true })
  readonly in?: string[];

  @IsString({ each: true, message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [String], { nullable: true })
  readonly notIn?: string[];
}
