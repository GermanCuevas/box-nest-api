import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CreateUser } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUser } from './dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
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

  async loginUser(loginUser: LoginUser, @Res() res: Response) {
    try {
      const user = await this.userModel.findOne({ email: loginUser.email });
      if (!user) throw new NotFoundException('User not found');
      //const validate = user.validatePassword('sds');
      await user.checkpass(loginUser.password);
      const payload = { id_user: user._id, name: user.name, mail: user.email };
      const token = await this.jwtService.signAsync(payload);
      res.cookie('token', token);
      res.send(user);
    } catch (error) {
      console.log(error);
      //Invalid password

      switch (error.message) {
        case 'Invalid password':
          throw error;
          break;
        case 'User not found':
          throw error;
          break;
        default:
          throw new InternalServerErrorException();
          break;
      }
    }
  }
}
