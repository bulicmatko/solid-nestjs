import { Injectable, NotFoundException } from "@nestjs/common";
import { isDefined, isString, isUUID } from "class-validator";

import { Validator } from "@core/modules/validator";

import { CurrentUser } from "../../../core/auth/decorators/current-user.decorator";

import { CompanyIsVisibleService } from "../services/company-is-visible.service";

interface CompanyIdValidatorMeta {
  readonly user: CurrentUser;
  readonly showDeleted?: boolean;
}

@Injectable()
export class CompanyIdValidator implements Validator<string> {
  constructor(private readonly service: CompanyIsVisibleService) {}

  async validate(
    value: unknown,
    { user, showDeleted }: CompanyIdValidatorMeta,
  ): Promise<string> {
    if (!isDefined(value)) {
      throw new NotFoundException();
    }

    if (!isString(value)) {
      throw new NotFoundException();
    }

    if (!isUUID(value, "4")) {
      throw new NotFoundException();
    }

    if (!(await this.service.isVisible(value, { user, showDeleted }))) {
      throw new NotFoundException();
    }

    return value;
  }
}
