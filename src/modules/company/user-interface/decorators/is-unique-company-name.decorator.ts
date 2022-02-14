import { ValidationOptions, registerDecorator } from 'class-validator';

import { IsUniqueCompanyNameConstraint } from '../../constraints/is-unique-company-name.constraint';

export function IsUniqueCompanyName(options?: ValidationOptions) {
  return (object: object, propertyName: string): void =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsUniqueCompanyNameConstraint,
    });
}
