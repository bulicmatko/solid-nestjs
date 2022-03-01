import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Session {
  @Field(() => String)
  readonly accessToken: string;

  constructor(data: Session) {
    Object.assign(this, data);
  }
}
