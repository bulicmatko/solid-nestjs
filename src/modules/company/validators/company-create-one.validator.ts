import { Injectable } from "@nestjs/common";

import { Validator } from "../../../utils/validator.util";
import { combineValidators } from "../../../utils/combine-validators.util";

import { CompanyNameValidator } from "./company-name.validator";

interface CompanyCreateOneData {
  readonly name: string;
}

@Injectable()
export class CompanyCreateOneValidator
  implements Validator<CompanyCreateOneData>
{
  constructor(private readonly nameValidator: CompanyNameValidator) {}

  validate(value: CompanyCreateOneData): Promise<CompanyCreateOneData> {
    return combineValidators<CompanyCreateOneData>({
      name: this.nameValidator.validate(value.name),
    });
  }
}
