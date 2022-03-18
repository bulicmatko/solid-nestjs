import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Company {
  @Field(() => ID)
  readonly id: string;

  @Field(() => String)
  readonly name: string;

  constructor(data: Company) {
    Object.assign(this, data);
  }
}
