import { Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";

import { Context, getRequestUser } from "../../../utils/execution-context.util";

import { CompanyDeleteOneArgs } from "../user-interface/inputs/company-delete-one.input";
import { CompanyDeleteOneValidator } from "../validators/company-delete-one.validator";

@Injectable({ scope: Scope.REQUEST })
export class CompanyDeleteOnePipe implements PipeTransform {
  constructor(
    @Inject(CONTEXT)
    private readonly context: Context,
    private readonly validator: CompanyDeleteOneValidator,
  ) {}

  transform({ id }: CompanyDeleteOneArgs): Promise<CompanyDeleteOneArgs> {
    const user = getRequestUser(this.context.req);
    return this.validator.validate({ id }, { user });
  }
}
