import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
export class HistoryDto {
  @IsNotEmpty({ message: 'Address is required' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsString()
  status: string;

  @IsNotEmpty({ message: 'DeliveryCode is required' })
  @IsString()
  deliveryCode: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'DeadLine is required' })
  @IsString()
  deadLine: Date;

  @IsNotEmpty({ message: 'Deliveried date is required' })
  @IsString()
  deliveriedDate: Date;

  @IsNotEmpty({ message: 'Coordinates is required' })
  @IsArray()
  coordinates: number[];

  @IsNotEmpty({ message: 'ReceptorName is required' })
  @IsString()
  receptorName: string;

  @IsNotEmpty({ message: 'Weight is required' })
  @IsNumber()
  weight: number;

  @IsMongoId({ message: 'userId is not MongoID' })
  userId: MongooseSchema.Types.ObjectId;
}
