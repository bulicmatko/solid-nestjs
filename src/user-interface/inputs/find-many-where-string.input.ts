import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class FindManyWhereString {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly equals?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly not?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly contains?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly startsWith?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly endsWith?: string;

  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly in?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly notIn?: string[];
}
