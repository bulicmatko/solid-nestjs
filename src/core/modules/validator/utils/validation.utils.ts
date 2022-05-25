export enum ErrorCode {
  REQUIRED = "REQUIRED",
  MIN = "MIN",
  MAX = "MAX",
  LENGTH = "LENGTH",
  MISMATCH = "MISMATCH",

  NOT_FOUND = "NOT_FOUND",
  NOT_UNIQUE = "NOT_UNIQUE",

  EXPIRED = "EXPIRED",

  INVALID = "INVALID",
}

export abstract class Validator<T, O = object> {
  abstract validate(value: unknown, options?: O): Promise<T> | T;
}
