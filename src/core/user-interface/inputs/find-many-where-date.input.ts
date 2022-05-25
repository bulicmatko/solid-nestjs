import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsOptional } from "class-validator";

import { UnprocessableFieldCode } from "../outputs/unprocessable.output";

@InputType()
export class FindManyWhereDate {
  @IsDate({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly equals?: Date;

  @IsDate({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly not?: Date;

  @IsDate({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly gt?: Date;

  @IsDate({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly gte?: Date;

  @IsDate({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly lt?: Date;

  @IsDate({ message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => Date, { nullable: true })
  readonly lte?: Date;

  @IsDate({ each: true, message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [Date], { nullable: true })
  readonly in?: Date[];

  @IsDate({ each: true, message: UnprocessableFieldCode.INVALID })
  @IsOptional({ message: UnprocessableFieldCode.INVALID })
  @Field(() => [Date], { nullable: true })
  readonly notIn?: Date[];
}
