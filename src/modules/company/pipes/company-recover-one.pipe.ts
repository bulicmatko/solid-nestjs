import { Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";

import { Context, getRequestUser } from "../../../utils/execution-context.util";

import { CompanyRecoverOneArgs } from "../user-interface/inputs/company-recover-one.input";
import { CompanyRecoverOneValidator } from "../validators/company-recover-one.validator";

@Injectable({ scope: Scope.REQUEST })
export class CompanyRecoverOnePipe implements PipeTransform {
  constructor(
    @Inject(CONTEXT)
    private readonly context: Context,
    private readonly validator: CompanyRecoverOneValidator,
  ) {}

  transform({ id }: CompanyRecoverOneArgs): Promise<CompanyRecoverOneArgs> {
    const user = getRequestUser(this.context.req);
    return this.validator.validate({ id }, { user });
  }
}
