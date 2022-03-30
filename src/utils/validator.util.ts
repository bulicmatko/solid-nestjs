export enum ErrorCode {
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

export abstract class Validator<V, M = object> {
  abstract validate(value: unknown, meta: M): Promise<V>;
}
