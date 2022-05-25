import { Injectable } from "@nestjs/common";

import { PaginationService } from "../../../core/modules/pagination/services/pagination.service";

import { FindManyWhereString } from "../../../core/modules/prisma/contracts/find-many-where-string.contract";
import { FindManyOrderDirection } from "../../../core/modules/prisma/contracts/find-many-order-direction.contract";
import { PrismaService } from "../../../core/modules/prisma/services/prisma.service";

import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { AbilityService } from "../../auth/services/ability.service";

interface CompanyFindManyWhere {
  readonly name?: FindManyWhereString;
}

interface CompanyFindManyOrderBy {
  readonly name?: FindManyOrderDirection;
}

interface CompanyFindManyFilter {
  readonly where?: CompanyFindManyWhere;
  readonly orderBy?: CompanyFindManyOrderBy;
  readonly take?: number;
  readonly after?: string;
}

interface Company {
  readonly id: string;
  readonly name: string;
}

interface CompanyEdge {
  readonly node: Company;
  readonly cursor: string;
}

interface CompanyPageInfo {
  readonly endCursor: string | null;
  readonly hasNextPage: boolean;
}

interface CompanyConnection {
  readonly edges: CompanyEdge[];
  readonly pageInfo: CompanyPageInfo;
}

interface CompanyFindManyMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyFindManyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
    private readonly pagination: PaginationService,
  ) {}

  async findMany(
    filter: CompanyFindManyFilter,
    { user }: CompanyFindManyMeta,
  ): Promise<CompanyConnection> {
    const userWhere = this.ability.getWhereInput(user).Company;

    const companyList = await this.prisma.company.findMany({
      ...this.pagination.getPaginationQuery(filter),
      where: { AND: [userWhere, filter?.where || {}, { deletedAt: null }] },
      orderBy: filter?.orderBy || { id: "asc" },
      select: { id: true, name: true },
    });

    return this.pagination.toConnection(companyList, filter);
  }
}
