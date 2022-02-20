import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class FindManyWhereString {
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly equals?: string;

  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly not?: string;

  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly contains?: string;

  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly startsWith?: string;

  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly endsWith?: string;

  @MaxLength(100, { each: true })
  @MinLength(3, { each: true })
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly in?: string[];

  @MaxLength(100, { each: true })
  @MinLength(3, { each: true })
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly notIn?: string[];
}
