import { IsDefined, IsInt, IsString } from "class-validator";

export class RedisConfig {
  @IsString()
  @IsDefined()
  readonly REDIS_HOST: string;

  @IsInt()
  @IsDefined()
  readonly REDIS_PORT: number;
}
