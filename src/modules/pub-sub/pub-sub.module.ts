import { Module } from '@nestjs/common';

import { PubSubConfigModule } from './config/pub-sub-config.module';
import { PubSubService } from './services/pub-sub.service';

@Module({
  imports: [PubSubConfigModule],
  providers: [PubSubService],
  exports: [PubSubService],
})
export class PubSubModule {}
