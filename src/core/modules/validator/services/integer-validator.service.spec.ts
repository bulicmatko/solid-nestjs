import { UnprocessableEntityException } from "@nestjs/common";

import { ErrorCode } from "../utils/validation.utils";

import { IntegerValidatorService } from "./integer-validator.service";

describe("IntegerValidatorService", () => {
  let service: IntegerValidatorService;

  beforeEach(() => {
    service = new IntegerValidatorService();
  });

  it("should return validated value (true)", () => {
    const expected = 15;
    const result = service.validate(expected, { nullable: false, min: 10 });
    expect(result).resolves.toBe(expected);
  });
});
