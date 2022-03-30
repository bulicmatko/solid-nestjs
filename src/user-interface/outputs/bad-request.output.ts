import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum BadRequestCode {
  REQUIRED = "REQUIRED",

  NOT_CONFIRMED = "NOT_CONFIRMED",
  NOT_UNIQUE = "NOT_UNIQUE",
  NOT_FOUND = "NOT_FOUND",

  TOO_SHORT = "TOO_SHORT",
  TOO_LONG = "TOO_LONG",

  TOO_SMALL = "TOO_SMALL",
  TOO_BIG = "TOO_BIG",

  TOO_LOW = "TOO_LOW",
  TOO_HIGH = "TOO_HIGH",

  FORBIDDEN = "FORBIDDEN",

  INVALID = "INVALID",
}

registerEnumType(BadRequestCode, {
  name: "BadRequestCode",
});

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
