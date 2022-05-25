import { Module } from "@nestjs/common";

import { ValidatorModule } from "@core/modules/validator";

import { AccountPasswordValidateService } from "./account-password-validate.service";

@Module({
  imports: [ValidatorModule],
  providers: [AccountPasswordValidateService],
  exports: [AccountPasswordValidateService],
})
export class AccountPasswordModule {}
