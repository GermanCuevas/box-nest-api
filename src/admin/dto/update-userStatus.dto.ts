import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserStatusDto {
  @IsNotEmpty({ message: 'Boolean requiered' })
  @IsBoolean()
  isDisabled: boolean;
}
