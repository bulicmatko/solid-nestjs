import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaConfigService extends ConfigService {
  getDatabaseUrl(): string {
    return this.get<string>(
      'DATABASE_URL',
      'postgresql://user:password@localhost:5432/database',
    );
  }
}
