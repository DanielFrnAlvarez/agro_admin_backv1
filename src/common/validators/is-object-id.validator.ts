import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'isObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return Types.ObjectId.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid ObjectId';
  }
}