import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/guards/auth.guard';
import { NotFound } from 'src/common/exceptions/exceptions';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('pendingPackages')
  async findPendingPackages() {
    try {
      const pendingPackages = await this.usersService.findPendingPackages();
      return pendingPackages;
    } catch (error) {
      switch (error.message) {
        case 'Pending packages not found':
          throw new NotFound('Packages not found');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  // comentario

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
