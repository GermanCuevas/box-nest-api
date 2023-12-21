import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PackagesModule } from 'src/packages/packages.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  imports: [PackagesModule, AuthModule],
  providers: [UsersService]
})
export class UsersModule {}
