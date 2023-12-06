import {
  Body,
  Controller,
  // Get,
  // HttpCode,
  // HttpStatus,
  Post
  // Request,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UsersService) {}

  @Post('add')
  postUser(@Body() User: any) {
    return this.UserService.create(User);
  }
}
