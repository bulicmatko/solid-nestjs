import { ForbiddenException, Injectable } from "@nestjs/common";

import { Validator } from "../../../utils/validator.util";

import { AbilityService } from "../../auth/services/ability.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";

import { CompanyIdValidator } from "./company-id.validator";

interface CompanyFindOneArgs {
  readonly id: string;
}

interface CompanyFindOneMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyFindOneValidator implements Validator<CompanyFindOneArgs> {
  constructor(
    private readonly ability: AbilityService,
    private readonly idValidator: CompanyIdValidator,
  ) {}

  async validate(
    { id }: CompanyFindOneArgs,
    { user }: CompanyFindOneMeta,
  ): Promise<CompanyFindOneArgs> {
    const ability = this.ability.getAbility(user);

    if (!ability.can("read", "Company")) {
      throw new ForbiddenException();
    }

    return {
      id: await this.idValidator.validate(id, { user }),
    };
  }
}
