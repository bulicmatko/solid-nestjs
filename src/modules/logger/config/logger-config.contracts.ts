import { IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  LOG = "log",
  DEBUG = "debug",
  VERBOSE = "verbose",
}

export class LoggerConfig {
  @IsEnum(LogLevel, { each: true })
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  readonly LOG_LEVELS: LogLevel[];
}
