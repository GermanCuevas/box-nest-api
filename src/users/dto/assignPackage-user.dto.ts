import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';

export class AssignPackageUserDto {
  @IsArray()
  @IsNotEmpty({ message: 'packagesId are required' })
  @IsMongoId({ each: true })
  packagesIds: MongooseSchema.Types.ObjectId[];

  @IsNotEmpty({ message: 'userId is required' })
  @IsMongoId()
  userId: MongooseSchema.Types.ObjectId;
}
