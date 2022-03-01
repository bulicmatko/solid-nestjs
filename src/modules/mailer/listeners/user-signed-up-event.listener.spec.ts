import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";

import { MailerConfigModule } from "../config/mailer-config.module";
import { MailerService } from "../services/mailer.service";

import { UserSignedUpEventListener } from "./user-signed-up-event.listener";

describe("UserSignedUpEventListener", () => {
  let service: UserSignedUpEventListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, MailerConfigModule],
      providers: [MailerService, UserSignedUpEventListener],
    }).compile();

    service = module.get<UserSignedUpEventListener>(UserSignedUpEventListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
