import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PackagesModule } from 'src/packages/packages.module';

@Module({
  controllers: [UsersController],
  imports: [PackagesModule],
  providers: [UsersService]
})
export class UsersModule {}
