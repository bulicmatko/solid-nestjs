import { ValidationOptions, registerDecorator } from "class-validator";

import { IsUniqueUserEmailConstraint } from "../../constraints/is-unique-user-email.constraint";

export function IsUniqueUserEmail(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsUniqueUserEmailConstraint,
    });
}
