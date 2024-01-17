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
  deadLine: Date; //se puede ordenar los paquetes con fecha limite proxima

  @IsOptional()
  @IsString()
  deliveriedDate: Date;

  @IsOptional()
  @IsString()
  createdAt: Date;

  @IsOptional()
  @IsString()
  assignedDate: Date;

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
