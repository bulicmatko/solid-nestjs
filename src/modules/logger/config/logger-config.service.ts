import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LogLevel } from './logger-config.contracts';

@Injectable()
export class LoggerConfigService extends ConfigService {
  getLogLevels(): LogLevel[] {
    return this.get<LogLevel[]>('LOG_LEVELS', [
      LogLevel.ERROR,
      LogLevel.WARN,
      LogLevel.LOG,
      LogLevel.DEBUG,
      LogLevel.VERBOSE,
    ]);
  }
}
