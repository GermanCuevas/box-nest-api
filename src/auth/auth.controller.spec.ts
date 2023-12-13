import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/users.entity';
import { getModelToken } from '@nestjs/mongoose';

// Define la clase JwtServiceMock
class JwtServiceMock {
  // Implementa las funciones necesarias para tus pruebas
  signAsync(payload: any): string {
    return 'token';
  }
}

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: getModelToken(User.name), useValue: {} }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
