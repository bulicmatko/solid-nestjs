import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class RedisConfig {
  @IsString()
  @IsDefined()
  readonly REDIS_HOST: string;

  @IsInt()
  @IsDefined()
  readonly REDIS_PORT: number;

  @IsString()
  @IsOptional()
  readonly REDIS_USER?: string;

  @IsString()
  @IsOptional()
  readonly REDIS_PASS?: string;
}
