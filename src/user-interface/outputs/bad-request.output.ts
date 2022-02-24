import { Field, ObjectType } from "@nestjs/graphql";

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
