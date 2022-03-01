import { IsDefined, IsString } from "class-validator";

export class RedisConfig {
  @IsString()
  @IsDefined()
  readonly REDIS_URL: string;
}
