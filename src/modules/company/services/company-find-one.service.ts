import { Injectable, NotFoundException } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { AbilityService } from "../../auth/services/ability.service";

interface CompanyFindOneMeta {
  readonly user: CurrentUser;
}

interface FoundCompany {
  readonly id: number;
  readonly name: string;
}

@Injectable()
export class CompanyFindOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
  ) {
    this.logger.setContext(CompanyFindOneService.name);
  }

  async findOne(
    id: number,
    { user }: CompanyFindOneMeta,
  ): Promise<FoundCompany> {
    this.logger.debug("Finding Company:", { id });

    const userWhere = this.ability.getWhereInput(user).Company;
    const company = await this.prisma.company.findFirst({
      where: { AND: [userWhere, { id, deletedAt: null }] },
      select: { id: true, name: true },
    });

    if (!company) {
      this.logger.debug("Company Not Found:", { id });
      throw new NotFoundException();
    }

    this.logger.debug("Company Found:", { company });

    return company;
  }
}
