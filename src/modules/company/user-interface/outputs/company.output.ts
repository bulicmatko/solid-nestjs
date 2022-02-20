import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Company {
  @Field(() => Int)
  readonly id: number;

  @Field(() => String)
  readonly name: string;

  constructor(data: Company) {
    Object.assign(this, data);
  }
}
