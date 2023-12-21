import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Patch,
  Post
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/guards/auth.guard';
import { NotFound } from 'src/common/exceptions/exceptions';
import { AssignPackageUserDto } from './dto/assignPackage-user.dto';
import { CancelAssignedPackageDto } from './dto/cancelAssignedPackages.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('availablePackages')
  async availablePackages() {
    try {
      const availablePackages = await this.usersService.findAvailablePackages();
      return availablePackages;
    } catch (error) {
      switch (error.message) {
        case 'Available packages not found':
          throw new NotFound('Packages not found');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('assignPackage')
  async assignPackage(@Body() assignPackageUserDto: AssignPackageUserDto) {
    try {
      const assignPackages = await this.usersService.assignPackageToUser(assignPackageUserDto);
      return assignPackages;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound();
        case 'Package not found':
          throw new NotFound('Package not found');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Patch('cancelAssignedPackage')
  async cancelAssignedPackage(@Body() cancelAssignedPackageDto: CancelAssignedPackageDto) {
    try {
      const cancelAssignPackages =
        await this.usersService.cancelAssignedPackage(cancelAssignedPackageDto);
      return cancelAssignPackages;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound();
        case 'Package not found':
          throw new NotFound('Package not found');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
