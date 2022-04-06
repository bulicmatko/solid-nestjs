import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional } from "class-validator";

import { UnprocessableFieldCode } from "../outputs/unprocessable.output";

@InputType()
export class FindManyWhereFloat {
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: UnprocessableFieldCode.INVALID },
  )
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly equals?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: UnprocessableFieldCode.INVALID },
  )
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly not?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: UnprocessableFieldCode.INVALID },
  )
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly gt?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: UnprocessableFieldCode.INVALID },
  )
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly gte?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: UnprocessableFieldCode.INVALID },
  )
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly lt?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: UnprocessableFieldCode.INVALID },
  )
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly lte?: number;

  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [Float], { nullable: true })
  readonly in?: number[];

  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [Float], { nullable: true })
  readonly notIn?: number[];
}
