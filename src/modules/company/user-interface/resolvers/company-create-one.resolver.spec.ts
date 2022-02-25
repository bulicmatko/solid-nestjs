import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";
import { AuthModule } from "../../../auth/auth.module";

import { CompanyCreateOneService } from "../../services/company-create-one.service";

import { CompanyCreateOneResolver } from "./company-create-one.resolver";

describe("CompanyCreateOneResolver", () => {
  let resolver: CompanyCreateOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        LoggerModule,
        PubSubModule,
        PrismaModule,
        AuthModule,
      ],
      providers: [CompanyCreateOneResolver, CompanyCreateOneService],
    }).compile();

    resolver = module.get<CompanyCreateOneResolver>(CompanyCreateOneResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
