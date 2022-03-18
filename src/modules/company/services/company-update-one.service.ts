import { Injectable, NotFoundException } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { AbilityService } from "../../auth/services/ability.service";

export interface CompanyUpdateOneData {
  readonly name?: string;
}

export interface CompanyUpdateOneMeta {
  readonly user: CurrentUser;
}

interface UpdatedCompany {
  readonly id: string;
  readonly name: string;
}

@Injectable()
export class CompanyUpdateOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
  ) {
    this.logger.setContext(CompanyUpdateOneService.name);
  }

  async updateOne(
    id: string,
    data: CompanyUpdateOneData,
    { user }: CompanyUpdateOneMeta,
  ): Promise<UpdatedCompany> {
    this.logger.debug("Updating Company:", { id, data, user });

    const userWhere = this.ability.getWhereInput(user).Company;
    const companyToBeUpdated = await this.prisma.company.findFirst({
      where: { AND: [userWhere, { id, deletedAt: null }] },
      select: { id: true },
    });

    if (!companyToBeUpdated) {
      this.logger.debug("Company Not Found:", { id, user });
      throw new NotFoundException();
    }

    const company = await this.prisma.company.update({
      where: { id },
      data,
      select: { id: true, name: true },
    });

    this.logger.debug("Company Updated:", { company });

    return company;
  }
}
