import { IsNotEmpty } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'src/common/decorators/isMongoId';

export class AddPackageUser {
  @IsNotEmpty({ message: 'IdUser is required' })
  @IsMongoId({ message: 'IdUser is not MongoID' })
  idUser: MongooseSchema.Types.ObjectId;
  @IsNotEmpty({ message: 'IdPackage is required' })
  @IsMongoId({ message: 'IdPackage is not MongoID' })
  idPackage: MongooseSchema.Types.ObjectId;
}
