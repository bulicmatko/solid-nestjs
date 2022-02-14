import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from '../../../constants/env-config.constants';
import { validate } from '../../../utils/config-validator.util';

import { PrismaConfig } from './prisma-config.contracts';
import { PrismaConfigService } from './prisma-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate(PrismaConfig),
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [PrismaConfigService],
  exports: [PrismaConfigService],
})
export class PrismaConfigModule {}
