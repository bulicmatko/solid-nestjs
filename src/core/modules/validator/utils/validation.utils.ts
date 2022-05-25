export enum ErrorCode {
  REQUIRED = "REQUIRED",
  MIN = "MIN",
  MAX = "MAX",
  LENGTH = "LENGTH",
  MISMATCH = "MISMATCH",
  INVALID = "INVALID",
}

export abstract class Validator<T, O = object> {
  abstract validate(value: unknown, options?: O): Promise<T>;
}
