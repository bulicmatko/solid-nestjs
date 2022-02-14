import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotFound {
  @Field(() => String)
  readonly message: string;

  constructor(data: NotFound) {
    Object.assign(this, data);
  }
}
