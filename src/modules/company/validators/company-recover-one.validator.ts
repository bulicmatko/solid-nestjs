import { ForbiddenException, Injectable } from "@nestjs/common";

import { Validator } from "../../../utils/validator.util";

import { AbilityService } from "../../auth/services/ability.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";

import { CompanyIdValidator } from "./company-id.validator";

interface CompanyRecoverOneArgs {
  readonly id: string;
}

interface CompanyRecoverOneMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyRecoverOneValidator
  implements Validator<CompanyRecoverOneArgs>
{
  constructor(
    private readonly ability: AbilityService,
    private readonly idValidator: CompanyIdValidator,
  ) {}

  async validate(
    { id }: CompanyRecoverOneArgs,
    { user }: CompanyRecoverOneMeta,
  ): Promise<CompanyRecoverOneArgs> {
    const ability = this.ability.getAbility(user);

    if (!ability.can("delete", "Company")) {
      throw new ForbiddenException();
    }

    return {
      id: await this.idValidator.validate(id, { user, showDeleted: true }),
    };
  }
}
