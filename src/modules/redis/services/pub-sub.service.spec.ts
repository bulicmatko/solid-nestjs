import { Test, TestingModule } from "@nestjs/testing";

import { RedisConfigModule } from "../config/redis-config.module";

import { PubSubService } from "./pub-sub.service";

describe("PubSubService", () => {
  let service: PubSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisConfigModule],
      providers: [PubSubService],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
