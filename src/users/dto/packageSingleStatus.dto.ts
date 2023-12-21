import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class PackageSingleStatusDto {
  @IsNotEmpty({ message: 'packagesId are required' })
  @IsMongoId()
  packageId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty({ message: 'userId is required' })
  @IsMongoId()
  userId: MongooseSchema.Types.ObjectId;
}
