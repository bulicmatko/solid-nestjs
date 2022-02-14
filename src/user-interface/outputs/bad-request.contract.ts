import { Field, ObjectType } from '@nestjs/graphql';

import { BadRequestField } from './bad-request-field.contract';

@ObjectType()
export class BadRequest {
  @Field(() => String)
  readonly message: string;

  @Field(() => [BadRequestField], { nullable: true })
  readonly fields?: BadRequestField[];

  constructor(data: BadRequest) {
    Object.assign(this, data);
  }
}
