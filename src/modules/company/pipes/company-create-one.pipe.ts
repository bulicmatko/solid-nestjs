import { Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";

import { Context, getRequestUser } from "../../../utils/execution-context.util";

import { CompanyCreateOneArgs } from "../user-interface/inputs/company-create-one.input";
import { CompanyCreateOneValidator } from "../validators/company-create-one.validator";

@Injectable({ scope: Scope.REQUEST })
export class CompanyCreateOnePipe implements PipeTransform {
  constructor(
    @Inject(CONTEXT)
    private readonly context: Context,
    private readonly validator: CompanyCreateOneValidator,
  ) {}

  transform({ data }: CompanyCreateOneArgs): Promise<CompanyCreateOneArgs> {
    const user = getRequestUser(this.context.req);
    return this.validator.validate({ data }, { user });
  }
}
