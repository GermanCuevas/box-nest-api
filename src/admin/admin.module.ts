import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PackagesModule } from 'src/packages/packages.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AdminController],
  imports: [PackagesModule, AuthModule],
  providers: [AdminService]
})
export class AdminModule {}
