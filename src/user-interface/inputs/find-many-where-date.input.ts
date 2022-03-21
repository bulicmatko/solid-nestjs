import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsOptional } from "class-validator";

import { BadRequestCode } from "../outputs/bad-request.output";

@InputType()
export class FindManyWhereDate {
  @IsDate({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly equals?: Date;

  @IsDate({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly not?: Date;

  @IsDate({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly gt?: Date;

  @IsDate({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly gte?: Date;

  @IsDate({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly lt?: Date;

  @IsDate({ message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly lte?: Date;

  @IsDate({ each: true, message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [Date], { nullable: true })
  readonly in?: Date[];

  @IsDate({ each: true, message: BadRequestCode.INVALID })
  @IsOptional({ message: BadRequestCode.INVALID })
  @Field(() => [Date], { nullable: true })
  readonly notIn?: Date[];
}
