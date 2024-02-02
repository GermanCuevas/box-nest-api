import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/guards/auth.guard';
import { BadRequest, NotFound } from 'src/common/exceptions/exceptions';
import { AssignPackageUserDto } from './dto/assignPackage-user.dto';
import { PackageSingleStatusDto } from './dto/packageSingleStatus.dto';
import { PackagePendingAndInCourseDto } from './dto/packagePendingAndInCourse.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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
  @Put('cancelAssignedPackage')
  async cancelAssignedPackage(@Body() packageSingleStatusDto: PackageSingleStatusDto) {
    try {
      const cancelAssignPackages =
        await this.usersService.cancelAssignedPackage(packageSingleStatusDto);
      return cancelAssignPackages;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound();
        case 'Package not found':
          throw new NotFound('Package not found');
        case 'Package not found in pending package of user':
          throw new NotFound('Package not found in pending package of user');
        case 'Package not deleted':
          throw new NotFound('Package not deleted');
        case 'Package not deleted':
          throw new NotFound('The package history was not created');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('putPackageInCourse')
  async putPackageInCourse(@Body() packageSingleStatusDto: PackageSingleStatusDto) {
    try {
      const putPackageInCourse = await this.usersService.putPackageInCourse(packageSingleStatusDto);
      return putPackageInCourse;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound();
        case 'User already has package in course':
          throw new BadRequest('User already has package in course');
        case 'Package not found':
          throw new NotFound('Package not found');
        case 'Package not found in pending package of user':
          throw new NotFound('Package not found in pending package of user');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('putPackageInDelivered')
  async putPackageInDelivered(@Body() packageSingleStatusDto: PackageSingleStatusDto) {
    try {
      const putPackageInDelivered = this.usersService.putPackageInDelivered(packageSingleStatusDto);
      return putPackageInDelivered;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound();
        case 'Package not found':
          throw new NotFound('Package not found');
        case 'Package not found in pending package of user':
          throw new NotFound('Package not found in pending package of user');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('packagePendingAndInCourse/:userId')
  async packagePendingAndInCourse(@Param('userId') userId: string) {
    try {
      const packagePendingAndInCourse = await this.usersService.packagePendingAndInCourse(userId);
      return packagePendingAndInCourse;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound('User not found');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('lastSwornStatement/:id')
  async lastSwornStatement(@Param() id: any) {
    try {
      return this.usersService.lastSwornStatement(id);
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw new NotFound('User not found');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
