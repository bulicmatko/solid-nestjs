import { IsDefined, IsString, IsUUID } from "class-validator";

export class ConfirmEmailData {
  @IsUUID()
  @IsString()
  @IsDefined()
  readonly code: string;
}
