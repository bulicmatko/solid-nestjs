import { IsDefined, IsInt, IsString } from "class-validator";

export class PubSubConfig {
  @IsString()
  @IsDefined()
  readonly PUB_SUB_REDIS_HOST: string;

  @IsInt()
  @IsDefined()
  readonly PUB_SUB_REDIS_PORT: number;
}
