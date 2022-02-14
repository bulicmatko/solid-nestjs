import { Module } from '@nestjs/common';

import { GraphQlModule } from './modules/graphql/graphql.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [GraphQlModule, AuthModule, UserModule, CompanyModule],
})
export class AppModule {}
