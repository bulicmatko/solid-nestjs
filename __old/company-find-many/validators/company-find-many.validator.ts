import { ForbiddenException, Injectable } from "@nestjs/common";

import { Validator } from "@core/modules/validator";

import { FindManyWhereString } from "../../../core/modules/prisma/contracts/find-many-where-string.contract";
import { FindManyOrderDirection } from "../../../core/modules/prisma/contracts/find-many-order-direction.contract";

import { CurrentUser } from "../../../core/auth/decorators/current-user.decorator";
import { AbilityService } from "../../../core/auth/services/ability.service";

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

interface CompanyFindManyArgs {
  readonly filter?: CompanyFindManyFilter;
}

interface CompanyFindManyMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyFindManyValidator
  implements Validator<CompanyFindManyArgs>
{
  constructor(private readonly ability: AbilityService) {}

  async validate(
    { filter }: CompanyFindManyArgs,
    { user }: CompanyFindManyMeta,
  ): Promise<CompanyFindManyArgs> {
    const ability = this.ability.getAbility(user);

    if (ability.cannot("read", "Company")) {
      throw new ForbiddenException();
    }

    return { filter };
  }
}