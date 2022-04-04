import { Injectable, NotFoundException } from "@nestjs/common";
import { isDefined, isString, isUUID } from "class-validator";

import { Validator } from "../../../utils/validator.util";

import { PrismaService } from "../../prisma/services/prisma.service";
import { AbilityService } from "../../auth/services/ability.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";

interface CompanyIdValidatorMeta {
  readonly user: CurrentUser;
  readonly showDeleted?: boolean;
}

@Injectable()
export class CompanyIdValidator implements Validator<string> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ability: AbilityService,
  ) {}

  async validate(
    value: unknown,
    { user, showDeleted }: CompanyIdValidatorMeta,
  ): Promise<string> {
    if (!isDefined(value)) {
      throw new NotFoundException("Company not found!");
    }

    if (!isString(value)) {
      throw new NotFoundException("Company not found!");
    }

    if (!isUUID(value, "4")) {
      throw new NotFoundException("Company not found!");
    }

    if (!(await this.isVisible(value, user, showDeleted))) {
      throw new NotFoundException("Company not found!");
    }

    return value;
  }

  private async isVisible(
    id: string,
    user: CurrentUser,
    showDeleted?: boolean,
  ): Promise<boolean> {
    const userWhere = this.ability.getWhereInput(user).Company;
    const deletedAt = showDeleted ? undefined : null;

    const company = await this.prisma.company.findFirst({
      where: { AND: [userWhere, { id, deletedAt }] },
      select: { id: true },
    });

    return Boolean(company);
  }
}
