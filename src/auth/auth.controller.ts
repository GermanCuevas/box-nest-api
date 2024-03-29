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
import { BadRequest, Conflict, NotFound } from 'src/common/exceptions/exceptions';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('AddUser')
  async addUser(@Body() CreateUser: CreateUser) {
    try {
      await this.authService.createUser(CreateUser);
      return;
    } catch (error) {
      switch (error.message) {
        case 'Email already exist':
          throw new Conflict();
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
      return res.status(200).send(result.user);
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

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logoutUser')
  async logoutUser(@Res() res: Response) {
    res.clearCookie('token');
    res.sendStatus(204);
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
