import { IsDefined, IsString } from "class-validator";

export class PrismaConfig {
  @IsString()
  @IsDefined()
  readonly DATABASE_URL: string;
}
