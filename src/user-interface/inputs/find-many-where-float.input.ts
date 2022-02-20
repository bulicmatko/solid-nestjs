import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional } from "class-validator";

@InputType()
export class FindManyWhereFloat {
  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly equals?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly not?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly gt?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly gte?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly lt?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly lte?: number;

  @IsOptional()
  @Field(() => [Float], { nullable: true })
  readonly in?: number[];

  @IsOptional()
  @Field(() => [Float], { nullable: true })
  readonly notIn?: number[];
}
