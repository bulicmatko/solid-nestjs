import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsOptional } from "class-validator";

import { UnprocessableFieldCode } from "../outputs/unprocessable.output";

@InputType()
export class FindManyWhereInt {
  @IsInt({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly equals?: number;

  @IsInt({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly not?: number;

  @IsInt({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly gt?: number;

  @IsInt({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly gte?: number;

  @IsInt({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly lt?: number;

  @IsInt({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly lte?: number;

  @IsInt({ each: true, message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [Int], { nullable: true })
  readonly in?: number[];

  @IsInt({ each: true, message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [Int], { nullable: true })
  readonly notIn?: number[];
}
