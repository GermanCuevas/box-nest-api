import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('AddUser')
  addUser(@Body() CreateUser: CreateUser) {
    //s
    return this.authService.createUser(CreateUser);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('LoginUser')
  loginUser(@Body() LoginUserDto: LoginUser, @Res() res: Response) {
    //s
    return this.authService.loginUser(LoginUserDto, res);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
