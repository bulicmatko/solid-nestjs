import { Injectable } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { AbilityService } from "../../auth/services/ability.service";
import { PaginationService } from "../../pagination/services/pagination.service";

import { CompanyFindManyFilter } from "../user-interface/inputs/company-find-many.input";
import { CompanyConnection } from "../user-interface/outputs/company-find-many.output";

interface CompanyFindManyMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyFindManyService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
    private readonly pagination: PaginationService,
  ) {
    this.logger.setContext(CompanyFindManyService.name);
  }

  async findMany(
    filter: CompanyFindManyFilter,
    { user }: CompanyFindManyMeta,
  ): Promise<CompanyConnection> {
    this.logger.debug("Finding Companies:", { filter });

    const userWhere = this.ability.getWhereInput(user).Company;
    const companyList = await this.prisma.company.findMany({
      ...this.pagination.getPaginationQuery(filter),
      where: { AND: [userWhere, filter?.where || {}, { deletedAt: null }] },
      orderBy: filter?.orderBy || { id: "asc" },
      select: { id: true, name: true },
    });

    const companyConnection = this.pagination.toConnection(companyList, filter);

    this.logger.debug("Companies Found:", { companyConnection });

    return companyConnection;
  }
}
