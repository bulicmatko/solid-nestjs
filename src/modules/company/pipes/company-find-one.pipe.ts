import { Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { CONTEXT } from "@nestjs/graphql";

import { Context, getRequestUser } from "../../../utils/execution-context.util";

import { CompanyFindOneArgs } from "../user-interface/inputs/company-find-one.input";
import { CompanyFindOneValidator } from "../validators/company-find-one.validator";

@Injectable({ scope: Scope.REQUEST })
export class CompanyFindOnePipe implements PipeTransform {
  constructor(
    @Inject(CONTEXT)
    private readonly context: Context,
    private readonly validator: CompanyFindOneValidator,
  ) {}

  transform({ id }: CompanyFindOneArgs): Promise<CompanyFindOneArgs> {
    const user = getRequestUser(this.context.req);
    return this.validator.validate({ id }, { user });
  }
}
