import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Forbidden {
  @Field(() => String)
  readonly message: string;

  constructor(data: Forbidden) {
    Object.assign(this, data);
  }
}
