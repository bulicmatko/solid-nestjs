import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsDefined, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

@ArgsType()
export class CompanyDeleteOneArgs {
  @IsInt()
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @Field(() => ID)
  readonly id: number;
}
