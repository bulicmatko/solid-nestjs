import { Module } from "@nestjs/common";

import { LoggerConfigModule } from "./config/logger-config.module";
import { LoggerService } from "./services/logger.service";

@Module({
  imports: [LoggerConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
