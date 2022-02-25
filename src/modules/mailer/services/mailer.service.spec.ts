import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { MailerService } from "./mailer.service";

describe("MailerService", () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
