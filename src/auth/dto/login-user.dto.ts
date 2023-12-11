import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUser {
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
