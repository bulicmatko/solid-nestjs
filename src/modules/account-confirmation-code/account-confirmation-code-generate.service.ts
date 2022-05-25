import { Injectable } from "@nestjs/common";
import { v4 as uuidV4 } from "uuid";
import { addHours } from "date-fns";

interface GeneratedAccountConfirmationRequest {
  readonly code: string;
  readonly expiresAt: Date;
}

@Injectable()
export class AccountConfirmationCodeGenerateService {
  async generate(): Promise<GeneratedAccountConfirmationRequest> {
    return { code: uuidV4(), expiresAt: addHours(new Date(), 24) };
  }
}
