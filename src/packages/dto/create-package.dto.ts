import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty({ message: 'Address is required' })
  @IsString()
  address: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  deliveriedDate: Date;

  @IsOptional()
  @IsArray()
  coordinates: number[];

  @IsNotEmpty({ message: 'ReceptorName is required' })
  @IsString()
  receptorName: string;

  @IsNotEmpty({ message: 'Weight is required' })
  @IsNumber()
  weight: number;
}
