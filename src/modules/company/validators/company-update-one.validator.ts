import { ForbiddenException, Injectable } from "@nestjs/common";

import { Validator } from "../../../utils/validator.util";
import { combineValidators } from "../../../utils/combine-validators.util";

import { AbilityService } from "../../auth/services/ability.service";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";

import { CompanyIdValidator } from "./company-id.validator";
import { CompanyNameValidator } from "./company-name.validator";

interface CompanyUpdateOneData {
  readonly name?: string;
}

interface CompanyUpdateOneArgs {
  readonly id: string;
  readonly data: CompanyUpdateOneData;
}

interface CompanyUpdateOneMeta {
  readonly user: CurrentUser;
}

@Injectable()
export class CompanyUpdateOneValidator
  implements Validator<CompanyUpdateOneArgs>
{
  constructor(
    private readonly ability: AbilityService,
    private readonly idValidator: CompanyIdValidator,
    private readonly nameValidator: CompanyNameValidator,
  ) {}

  async validate(
    { id, data }: CompanyUpdateOneArgs,
    { user }: CompanyUpdateOneMeta,
  ): Promise<CompanyUpdateOneArgs> {
    const ability = this.ability.getAbility(user);

    if (!ability.can("update", "Company")) {
      throw new ForbiddenException();
    }

    return {
      id: await this.idValidator.validate(id, { user }),
      data: await combineValidators<CompanyUpdateOneData>({
        name: this.nameValidator.validate(data.name, { companyId: id }),
      }),
    };
  }
}
