import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";
import { AuthModule } from "../../../auth/auth.module";

import { CompanyUpdateOneService } from "../../services/company-update-one.service";

import { CompanyUpdateOneResolver } from "./company-update-one.resolver";

describe("CompanyUpdateOneResolver", () => {
  let resolver: CompanyUpdateOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        LoggerModule,
        PubSubModule,
        PrismaModule,
        AuthModule,
      ],
      providers: [CompanyUpdateOneResolver, CompanyUpdateOneService],
    }).compile();

    resolver = module.get<CompanyUpdateOneResolver>(CompanyUpdateOneResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
