import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";

import { MailerConfigModule } from "../config/mailer-config.module";
import { MailerService } from "../services/mailer.service";

import { UserSignedUpListener } from "./user-signed-up.listener";

describe("UserSignedUpListener", () => {
  let service: UserSignedUpListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, MailerConfigModule],
      providers: [MailerService, UserSignedUpListener],
    }).compile();

    service = module.get<UserSignedUpListener>(UserSignedUpListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
