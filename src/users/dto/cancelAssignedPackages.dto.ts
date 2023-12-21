import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';

export class CancelAssignedPackageDto {
  @IsNotEmpty({ message: 'packagesId are required' })
  @IsMongoId()
  packageId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty({ message: 'userId is required' })
  @IsMongoId()
  userId: MongooseSchema.Types.ObjectId;
}
