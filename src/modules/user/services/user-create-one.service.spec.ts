import { Test, TestingModule } from "@nestjs/testing";

import { UserCreateOneService } from "./user-create-one.service";

describe("UserCreateOneService", () => {
  let service: UserCreateOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCreateOneService],
    }).compile();

    service = module.get<UserCreateOneService>(UserCreateOneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
