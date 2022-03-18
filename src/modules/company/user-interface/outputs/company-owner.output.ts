import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CompanyOwner {
  @Field(() => ID)
  readonly id: string;

  @Field(() => String)
  readonly email: string;

  constructor(data: CompanyOwner) {
    Object.assign(this, data);
  }
}
