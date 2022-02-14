import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';

import { LoggerConfigService } from '../config/logger-config.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor(private readonly config: LoggerConfigService) {
    super();

    this.setLogLevels(config.getLogLevels());
  }
}
