import { Injectable, NotFoundException } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { AbilityService } from "../../auth/services/ability.service";

export interface CompanyRecoverOneMeta {
  readonly user: CurrentUser;
}

interface RecoveredCompany {
  readonly id: number;
  readonly name: string;
}

@Injectable()
export class CompanyRecoverOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
  ) {
    this.logger.setContext(CompanyRecoverOneService.name);
  }

  async recoverOne(
    id: number,
    { user }: CompanyRecoverOneMeta,
  ): Promise<RecoveredCompany> {
    this.logger.debug("Recovering Company:", { id });

    const userWhere = this.ability.getWhereInput(user).Company;
    const companyToBeRecovered = await this.prisma.company.findFirst({
      where: { AND: [userWhere, { id, deletedAt: { not: null } }] },
      select: { id: true },
    });

    if (!companyToBeRecovered) {
      this.logger.debug("Company Not Found:", { id });
      throw new NotFoundException();
    }

    const company = await this.prisma.company.update({
      where: { id },
      data: { deletedAt: null },
      select: { id: true, name: true },
    });

    this.logger.debug("Company Recovered:", { company });

    return company;
  }
}
