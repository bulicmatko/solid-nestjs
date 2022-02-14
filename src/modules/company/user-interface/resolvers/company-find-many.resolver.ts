import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { AbilityGuard } from '../../../auth/guards/ability.guard';
import { CheckAbility } from '../../../auth/decorators/check-ability.decorator';

import { CompanyFindManyService } from '../../services/company-find-many.service';

import { CompanyFindManyArgs } from '../inputs/company-find-many.input';
import {
  CompanyConnection,
  CompanyFindManyResult,
} from '../outputs/company-find-many.output';

@Resolver()
@UseGuards(JwtAuthGuard, AbilityGuard)
export class CompanyFindManyResolver {
  constructor(private readonly company: CompanyFindManyService) {}

  @Query(() => CompanyFindManyResult)
  @CheckAbility((ability) => ability.can('read', 'Company'))
  async companyFindMany(
    @CurrentUser() user: CurrentUser,
    @Args({ type: () => CompanyFindManyArgs })
    { filter = {} }: CompanyFindManyArgs,
  ): Promise<typeof CompanyFindManyResult> {
    const companyConnection = await this.company.findMany(filter, { user });
    return new CompanyConnection(companyConnection);
  }
}
