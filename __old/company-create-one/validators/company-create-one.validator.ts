import { ForbiddenException, Injectable } from "@nestjs/common";

import { Validator } from "@core/modules/validator";

import { combineValidators } from "../../../core/utils/combine-validators.util";

import { CurrentUser } from "../../../core/auth/decorators/current-user.decorator";
import { AbilityService } from "../../../core/auth/services/ability.service";

import { CompanyNameValidator } from "../../company/validators/company-name.validator";

interface CompanyCreateOneData {
  readonly name: string;
}

interface CompanyCreateOneArgs {
  readonly data: CompanyCreateOneData;
}

interface CompanyCreateOneMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyCreateOneValidator
  implements Validator<CompanyCreateOneArgs>
{
  constructor(
    private readonly ability: AbilityService,
    private readonly nameValidator: CompanyNameValidator,
  ) {}

  async validate(
    { data }: CompanyCreateOneArgs,
    { user }: CompanyCreateOneMeta,
  ): Promise<CompanyCreateOneArgs> {
    const ability = this.ability.getAbility(user);

    if (ability.cannot("create", "Company")) {
      throw new ForbiddenException();
    }

    return {
      data: await combineValidators<CompanyCreateOneData>({
        name: this.nameValidator.validate(data.name),
      }),
    };
  }
}
