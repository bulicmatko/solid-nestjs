import { Injectable, PipeTransform, Scope } from "@nestjs/common";

import { CompanyCreateOneArgs } from "../user-interface/inputs/company-create-one.input";
import { CompanyCreateOneValidator } from "../validators/company-create-one.validator";

@Injectable({ scope: Scope.REQUEST })
export class CompanyCreateOnePipe implements PipeTransform {
  constructor(private readonly validator: CompanyCreateOneValidator) {}

  async transform({
    data,
  }: CompanyCreateOneArgs): Promise<CompanyCreateOneArgs> {
    return { data: await this.validator.validate(data) };
  }
}
