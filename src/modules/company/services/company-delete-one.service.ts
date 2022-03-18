import { Injectable, NotFoundException } from "@nestjs/common";

import { LoggerService } from "../../logger/services/logger.service";
import { PrismaService } from "../../prisma/services/prisma.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { AbilityService } from "../../auth/services/ability.service";

interface CompanyDeleteOneMeta {
  readonly user: CurrentUser;
}

interface DeletedCompany {
  readonly id: string;
  readonly name: string;
}

@Injectable()
export class CompanyDeleteOneService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
  ) {
    this.logger.setContext(CompanyDeleteOneService.name);
  }

  async deleteOne(
    id: string,
    { user }: CompanyDeleteOneMeta,
  ): Promise<DeletedCompany> {
    this.logger.debug("Deleting Company:", { id, user });

    const userWhere = this.ability.getWhereInput(user).Company;
    const companyToBeDeleted = await this.prisma.company.findFirst({
      where: { AND: [userWhere, { id, deletedAt: null }] },
      select: { id: true },
    });

    if (!companyToBeDeleted) {
      this.logger.debug("Company Not Found:", { id, user });
      throw new NotFoundException();
    }

    const company = await this.prisma.company.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: { id: true, name: true },
    });

    this.logger.debug("Company Deleted:", { company });

    return company;
  }
}
