import { UnprocessableEntityException } from "@nestjs/common";

import { ErrorCode } from "../utils/validation.utils";

import { BooleanValidatorService } from "./boolean-validator.service";

describe("BooleanValidatorService", () => {
  let service: BooleanValidatorService;

  beforeEach(() => {
    service = new BooleanValidatorService();
  });

  it("should return validated value (true)", () => {
    const result = service.validate(true);
    expect(result).resolves.toBe(true);
  });

  it("should return validated value (false)", () => {
    const result = service.validate(false);
    expect(result).resolves.toBe(false);
  });

  it("should return validated value (undefined)", () => {
    const result = service.validate(undefined, { nullable: true });
    expect(result).resolves.toBe(undefined);
  });

  it("should throw required error when receiving undefined value", () => {
    const result = service.validate(undefined);

    expect(result).rejects.toThrow(
      new UnprocessableEntityException(ErrorCode.REQUIRED),
    );
  });

  it("should throw invalid error when receiving non-boolean value (string)", () => {
    const result = service.validate("string");

    expect(result).rejects.toThrow(
      new UnprocessableEntityException(ErrorCode.INVALID),
    );
  });

  it("should throw invalid error when receiving non-boolean value (integer)", () => {
    const result = service.validate(10);

    expect(result).rejects.toThrow(
      new UnprocessableEntityException(ErrorCode.INVALID),
    );
  });

  it("should throw invalid error when receiving non-boolean value (object)", () => {
    const result = service.validate({});

    expect(result).rejects.toThrow(
      new UnprocessableEntityException(ErrorCode.INVALID),
    );
  });

  it("should throw invalid error when receiving non-boolean value (function)", () => {
    const result = service.validate(() => "test");

    expect(result).rejects.toThrow(
      new UnprocessableEntityException(ErrorCode.INVALID),
    );
  });
});
