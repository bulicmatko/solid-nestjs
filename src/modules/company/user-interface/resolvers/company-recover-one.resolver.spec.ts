import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";
import { AuthModule } from "../../../auth/auth.module";

import { CompanyRecoverOneService } from "../../services/company-recover-one.service";

import { CompanyRecoverOneResolver } from "./company-recover-one.resolver";

describe("CompanyRecoverOneResolver", () => {
  let resolver: CompanyRecoverOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        LoggerModule,
        PubSubModule,
        PrismaModule,
        AuthModule,
      ],
      providers: [CompanyRecoverOneResolver, CompanyRecoverOneService],
    }).compile();

    resolver = module.get<CompanyRecoverOneResolver>(CompanyRecoverOneResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
