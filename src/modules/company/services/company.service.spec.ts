import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../../prisma/prisma.module";

import { CompanyService } from "./company.service";

describe("CompanyService", () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CompanyService],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
