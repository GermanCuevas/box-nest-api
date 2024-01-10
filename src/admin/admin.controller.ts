import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from 'src/common/guards/auth.guard';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { UpdateUserStatusDto } from './dto/update-userStatus.dto';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('addPackage')
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.adminService.addPackage(createPackageDto);
  }

  @Public()
  @Patch('updateUserStatus/:id')
  updateUserStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(id, updateUserStatusDto);
  }

  // ? @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('deliveryDetails/:date')
  deliveryDetails(@Param('date') date: string) {
    return this.adminService.deliveryDetails(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
// ! administradores - repartos pendientes
