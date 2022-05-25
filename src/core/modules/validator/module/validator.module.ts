import { Module } from "@nestjs/common";

import { BooleanValidatorService } from "../services/boolean-validator.service";
import { DateValidatorService } from "../services/date-validator.service";
import { IntegerValidatorService } from "../services/integer-validator.service";
import { NumberValidatorService } from "../services/number-validator.service";
import { ObjectValidatorService } from "../services/object-validator.service";
import { StringValidatorService } from "../services/string-validator.service";

@Module({
  providers: [
    BooleanValidatorService,
    DateValidatorService,
    IntegerValidatorService,
    NumberValidatorService,
    ObjectValidatorService,
    StringValidatorService,
  ],
  exports: [
    BooleanValidatorService,
    DateValidatorService,
    IntegerValidatorService,
    NumberValidatorService,
    ObjectValidatorService,
    StringValidatorService,
  ],
})
export class ValidatorModule {}
