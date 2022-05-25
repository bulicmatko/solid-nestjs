import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum UnprocessableFieldCode {
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

registerEnumType(UnprocessableFieldCode, {
  name: "UnprocessableFieldCode",
});

@ObjectType({ isAbstract: true })
export class UnprocessableField {
  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly message: string;

  constructor(data: UnprocessableField) {
    Object.assign(this, data);
  }
}

@ObjectType()
export class Unprocessable {
  @Field(() => String)
  readonly message: string;

  @Field(() => [UnprocessableField], { nullable: true })
  readonly fields?: UnprocessableField[];

  constructor(data: Unprocessable) {
    Object.assign(this, data);
  }
}
