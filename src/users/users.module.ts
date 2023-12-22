import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PackagesModule } from 'src/packages/packages.module';
import { AuthModule } from 'src/auth/auth.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
  controllers: [UsersController],
  imports: [PackagesModule, AuthModule, HistoryModule],
  providers: [UsersService]
})
export class UsersModule {}
