import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsOptional } from "class-validator";

import { BadRequestCode } from "../outputs/bad-request.output";

@InputType()
export class FindManyWhereInt {
  @IsInt({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly equals?: number;

  @IsInt({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly not?: number;

  @IsInt({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly gt?: number;

  @IsInt({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly gte?: number;

  @IsInt({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly lt?: number;

  @IsInt({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Int, { nullable: true })
  readonly lte?: number;

  @IsInt({ each: true, message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [Int], { nullable: true })
  readonly in?: number[];

  @IsInt({ each: true, message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [Int], { nullable: true })
  readonly notIn?: number[];
}
