import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional } from "class-validator";

import { BadRequestCode } from "../outputs/bad-request.output";

@InputType()
export class FindManyWhereFloat {
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: BadRequestCode.INVALID },
  )
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly equals?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: BadRequestCode.INVALID },
  )
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly not?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: BadRequestCode.INVALID },
  )
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly gt?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: BadRequestCode.INVALID },
  )
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly gte?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: BadRequestCode.INVALID },
  )
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly lt?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    { message: BadRequestCode.INVALID },
  )
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Float, { nullable: true })
  readonly lte?: number;

  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [Float], { nullable: true })
  readonly in?: number[];

  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [Float], { nullable: true })
  readonly notIn?: number[];
}
