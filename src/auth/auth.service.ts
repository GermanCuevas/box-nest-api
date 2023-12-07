import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/users.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  async createUser(userData: CreateUser) {
    try {
      const user = await this.userModel.create(userData);
      return user;
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 11000:
          throw new BadRequestException(`The email ${error.keyValue.email} already exists`);
          break;
        default:
          throw new InternalServerErrorException();
          break;
      }
    }
  }

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
