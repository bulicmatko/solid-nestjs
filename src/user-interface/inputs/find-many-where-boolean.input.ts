import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@InputType()
export class FindManyWhereBoolean {
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly equals?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly not?: boolean;
}
