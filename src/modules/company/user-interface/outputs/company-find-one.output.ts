import { createUnionType } from '@nestjs/graphql';

import { Forbidden } from '../../../../user-interface/outputs/forbidden.contract';
import { NotFound } from '../../../../user-interface/outputs/not-found.contract';

import { Company } from './company.output';

export const CompanyFindOneResult = createUnionType({
  name: 'CompanyFindOneResult',
  types: () => [Forbidden, NotFound, Company],
});
