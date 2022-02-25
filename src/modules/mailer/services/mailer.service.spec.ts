import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";

import { MailerConfigModule } from "../config/mailer-config.module";

import { MailerService } from "./mailer.service";

describe("MailerService", () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, MailerConfigModule],
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
