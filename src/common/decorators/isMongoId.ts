import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsMongoId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return false; // Si el valor está vacío, no es un ObjectId válido
          }
          return Types.ObjectId.isValid(value); // Verifica si es un ObjectId válido de Mongoose
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid MongoId`;
        }
      }
    });
  };
}
