import { IsDefined, IsEnum, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  QUERY = "query",
}

export class PrismaConfig {
  @IsString()
  @IsDefined()
  readonly DATABASE_URL: string;

  @IsEnum(LogLevel, { each: true })
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  readonly PRISMA_LOG_LEVELS: LogLevel[];
}
