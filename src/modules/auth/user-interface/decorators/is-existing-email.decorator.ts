import { ValidationOptions, registerDecorator } from "class-validator";

import { IsExistingUserEmailConstraint } from "../../constraints/is-existing-user-email.constraint";

export function IsExistingUserEmail(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsExistingUserEmailConstraint,
    });
}
