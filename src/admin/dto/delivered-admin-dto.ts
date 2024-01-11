import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class DeliveredAdminDto {
  @IsMongoId({ message: 'userId debe ser un ID de MongoDB válido' })
  userId: string;

  @IsDateString()
  date: string;
}
