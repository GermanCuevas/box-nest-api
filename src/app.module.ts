import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [AuthModule, UsersModule, CatsModule, RegisterModule]
})
export class AppModule {}
