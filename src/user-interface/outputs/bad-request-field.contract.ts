import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BadRequestField {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly message: string;

  constructor(data: BadRequestField) {
    Object.assign(this, data);
  }
}
