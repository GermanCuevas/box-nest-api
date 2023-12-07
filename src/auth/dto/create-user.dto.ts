import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty({ message: 'name is required' })
  name: string;
  @IsNotEmpty({ message: 'lastname is required' })
  lastname: string;
  @IsNotEmpty({ message: 'email is required' })
  email: string;
  @IsNotEmpty({ message: 'password is required' })
  password: string;
  isAdmin: boolean;
  isDisabled: boolean;
  coordinates: number[];
  imgAvatar: string;
}
