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
    const email = await this.userModel.findOne({ email: userData.email });
    if (email) throw new Error('Email already exist');
    const user = await this.userModel.create(userData);
    if (!user) throw new Error('User not created');

    return user;
  }

  async loginUser(loginUser: LoginUser, @Res() res: Response) {
    const user = await this.userModel.findOne({ email: loginUser.email });
    if (!user) throw new Error('User not found');
    //const validate = user.validatePassword('sds');
    await user.checkpass(loginUser.password);
    const payload = { id_user: user._id, name: user.name, mail: user.email, isAdmin: user.isAdmin };
    const token = await this.jwtService.signAsync(payload);
    return { token, user: payload };
  }
}
