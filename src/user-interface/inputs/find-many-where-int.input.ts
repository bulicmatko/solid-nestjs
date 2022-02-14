import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class FindManyWhereInt {
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly equals?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly not?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly gt?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly gte?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly lt?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly lte?: number;

  @IsInt({ each: true })
  @IsOptional()
  @Field(() => [Int], { nullable: true })
  readonly in?: number[];

  @IsInt({ each: true })
  @IsOptional()
  @Field(() => [Int], { nullable: true })
  readonly notIn?: number[];
}
