import { Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";

import { Context, getRequestUser } from "../../../utils/execution-context.util";

import { CompanyUpdateOneArgs } from "../user-interface/inputs/company-update-one.input";
import { CompanyUpdateOneValidator } from "../validators/company-update-one.validator";

@Injectable({ scope: Scope.REQUEST })
export class CompanyUpdateOnePipe implements PipeTransform {
  constructor(
    @Inject(CONTEXT)
    private readonly context: Context,
    private readonly validator: CompanyUpdateOneValidator,
  ) {}

  transform({ id, data }: CompanyUpdateOneArgs): Promise<CompanyUpdateOneArgs> {
    const user = getRequestUser(this.context.req);
    return this.validator.validate({ id, data }, { user });
  }
}
