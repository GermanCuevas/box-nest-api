import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from './entities/package.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PackagesController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Package.name,
        schema: PackageSchema
      }
    ]),
    AuthModule
  ],
  providers: [PackagesService]
})
export class PackagesModule {}
