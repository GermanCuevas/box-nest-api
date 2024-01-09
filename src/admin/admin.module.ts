import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PackagesModule } from 'src/packages/packages.module';
import { AuthModule } from 'src/auth/auth.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
  controllers: [AdminController],
  imports: [PackagesModule, AuthModule, HistoryModule],
  providers: [AdminService]
})
export class AdminModule {}
