import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../core/modules/prisma/services/prisma.service";

import { CurrentUser } from "../../../core/auth/decorators/current-user.decorator";
import { AbilityService } from "../../../core/auth/services/ability.service";

interface CompanyIsVisibleServiceMeta {
  readonly user: CurrentUser;
  readonly showDeleted?: boolean;
}

@Injectable()
export class CompanyIsVisibleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
  ) {}

  async isVisible(
    id: string,
    { user, showDeleted }: CompanyIsVisibleServiceMeta,
  ): Promise<boolean> {
    const userWhere = this.ability.getWhereInput(user).Company;
    const deletedAt = showDeleted ? undefined : null;

    const foundCompany = await this.prisma.company.findFirst({
      where: { AND: [userWhere, { id, deletedAt }] },
      select: { id: true },
    });

    return Boolean(foundCompany);
  }
}
