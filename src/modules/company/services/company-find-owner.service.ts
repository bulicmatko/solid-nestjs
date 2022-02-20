import { Injectable } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";

interface FoundCompanyOwner {
  readonly id: number;
  readonly email: string;
}

@Injectable()
export class CompanyFindOwnerService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(CompanyFindOwnerService.name);
  }

  async findOwner(companyId: number): Promise<FoundCompanyOwner | null> {
    this.logger.debug("Finding Company Owner:", { companyId });

    const owner = await this.prisma.company
      .findUnique({ where: { id: companyId } })
      .user({ select: { id: true, email: true } });

    this.logger.debug("Company Owner Found:", { companyId, owner });

    return owner;
  }
}
