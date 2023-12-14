import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUser {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  name: string;
  @IsNotEmpty({ message: 'lastname is required' })
  @IsString()
  lastname: string;
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
  @IsOptional()
  isAdmin: boolean;
  @IsOptional()
  isDisabled: boolean;
  // @IsOptional()
  // coordinates: number[];
  @IsOptional()
  imgAvatar: string;
}
