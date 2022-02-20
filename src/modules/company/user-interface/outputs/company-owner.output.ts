import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CompanyOwner {
  @Field(() => Int)
  readonly id: number;

  @Field(() => String)
  readonly email: string;

  constructor(data: CompanyOwner) {
    Object.assign(this, data);
  }
}
