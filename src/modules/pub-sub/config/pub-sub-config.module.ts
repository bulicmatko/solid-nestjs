import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from '../../../constants/env-config.constants';
import { validate } from '../../../utils/config-validator.util';

import { PubSubConfig } from './pub-sub-config.contract';
import { PubSubConfigService } from './pub-sub-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate(PubSubConfig),
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [PubSubConfigService],
  exports: [PubSubConfigService],
})
export class PubSubConfigModule {}
