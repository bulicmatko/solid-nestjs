import { ForbiddenException, Injectable } from "@nestjs/common";

import { Validator } from "../../../utils/validator.util";

import { AbilityService } from "../../auth/services/ability.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";

import { CompanyIdValidator } from "./company-id.validator";

interface CompanyDeleteOneArgs {
  readonly id: string;
}

interface CompanyDeleteOneMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyDeleteOneValidator
  implements Validator<CompanyDeleteOneArgs>
{
  constructor(
    private readonly ability: AbilityService,
    private readonly idValidator: CompanyIdValidator,
  ) {}

  async validate(
    { id }: CompanyDeleteOneArgs,
    { user }: CompanyDeleteOneMeta,
  ): Promise<CompanyDeleteOneArgs> {
    const ability = this.ability.getAbility(user);

    if (!ability.can("delete", "Company")) {
      throw new ForbiddenException();
    }

    return {
      id: await this.idValidator.validate(id, { user }),
    };
  }
}
