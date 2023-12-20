import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../common/guards/auth.guard';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { Response } from 'express';
import { BadRequest, NotFound } from 'src/common/exceptions/exceptions';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('AddUser')
  async addUser(@Body() CreateUser: CreateUser) {
    try {
      const result = await this.authService.createUser(CreateUser);
      return;
    } catch (error) {
      switch (error.message) {
        case 'User not created':
          throw new BadRequest();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('LoginUser')
  async loginUser(@Body() LoginUserDto: LoginUser, @Res() res: Response) {
    try {
      const result = await this.authService.loginUser(LoginUserDto, res);
      res.cookie('token', result.token);
      return res.sendStatus(200);
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound();
        case 'Invalid password':
          throw new BadRequestException(error.message);
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
