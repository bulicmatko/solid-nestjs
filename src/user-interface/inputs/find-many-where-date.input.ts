import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsOptional } from "class-validator";

@InputType()
export class FindManyWhereDate {
  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly equals?: Date;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly not?: Date;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly gt?: Date;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly gte?: Date;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly lt?: Date;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly lte?: Date;

  @IsDate({ each: true })
  @IsOptional()
  @Field(() => [Date], { nullable: true })
  readonly in?: Date[];

  @IsDate({ each: true })
  @IsOptional()
  @Field(() => [Date], { nullable: true })
  readonly notIn?: Date[];
}
