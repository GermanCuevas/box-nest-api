import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class PackagePendingAndInCourseDto {
  @IsNotEmpty({ message: 'userId is required' })
  @IsMongoId()
  userId: MongooseSchema.Types.ObjectId;
}
