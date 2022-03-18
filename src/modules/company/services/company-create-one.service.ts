import { Injectable } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";

interface CompanyCreateOneData {
  readonly name: string;
}

interface CompanyCreateOneMeta {
  readonly user: {
    readonly id: string;
  };
}

interface CreatedCompany {
  readonly id: string;
  readonly name: string;
}

@Injectable()
export class CompanyCreateOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(CompanyCreateOneService.name);
  }

  async createOne(
    data: CompanyCreateOneData,
    { user }: CompanyCreateOneMeta,
  ): Promise<CreatedCompany> {
    this.logger.debug("Creating Company:", { data, user });

    const company = await this.prisma.company.create({
      data: { ...data, userId: user.id },
      select: { id: true, name: true },
    });

    this.logger.debug("Company Created:", { company });

    return company;
  }
}
