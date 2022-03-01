import { Test, TestingModule } from "@nestjs/testing";

import { RedisConfigModule } from "../config/redis-config.module";

import { RedisService } from "./redis.service";

describe("RedisService", () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisConfigModule],
      providers: [RedisService],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
