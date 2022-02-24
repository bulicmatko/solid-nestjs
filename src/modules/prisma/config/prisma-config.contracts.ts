import { IsDefined, IsEnum, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export enum DatabaseLogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  QUERY = "query",
}

export class PrismaConfig {
  @IsString()
  @IsDefined()
  readonly DATABASE_URL: string;

  @IsEnum(DatabaseLogLevel, { each: true })
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  readonly DATABASE_LOG_LEVELS: DatabaseLogLevel[];
}
