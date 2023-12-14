import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

// Define la clase JwtServiceMock
class JwtServiceMock {
  // Implementa las funciones necesarias para tus pruebas
  signAsync(payload: any): string {
    return 'token';
  }
}

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    createUser: jest.fn((dto) => {
      return {
        _id: '12345678',
        ...dto
      };
    }),
    loginUser: jest.fn((dto) => {
      return {
        ...dto
      };
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, { provide: JwtService, useClass: JwtServiceMock }]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const userData = {
    name: 'Florencia',
    lastname: 'Martinez',
    email: 'flor@gmail.com',
    password: 'Milanesa1234',
    isAdmin: false,
    isDisabled: false,
    imgAvatar: 'someImage.jpg'
  };

  it('addUser should create a user', () => {
    expect(controller.addUser(userData)).toEqual({
      _id: expect.any(String),
      ...userData
    });
  });

  it('addUser call authService.createUser with correct data', async () => {
    jest.spyOn(mockAuthService, 'createUser').mockResolvedValueOnce({
      ...userData,
      _id: expect.any(String),
      isAdmin: false,
      isDisabled: false,
      imgAvatar: 'someImage.jpg'
    });

    await controller.addUser(userData);

    expect(mockAuthService.createUser).toHaveBeenCalledWith({
      ...userData,
      isAdmin: false,
      isDisabled: false,
      imgAvatar: 'someImage.jpg'
    });
  });

  const loginData = {
    email: 'flor@gmail.com',
    password: 'Milanesa1234'
  };

  const fakeResponse = {
    cookie: jest.fn()
  } as unknown as Response;

  it('loginUser should authenticate a user', async () => {
    jest.spyOn(mockAuthService, 'loginUser').mockResolvedValueOnce({
      email: 'flor@gmail.com',
      password: 'Milanesa1234'
    });

    const response = await controller.loginUser(loginData, fakeResponse);
    expect(response).toEqual({
      ...loginData
    });
  });

  it('loginUser call authService.loginUser with correct data', async () => {
    jest.spyOn(mockAuthService, 'loginUser').mockResolvedValueOnce({
      ...loginData
    });

    await controller.loginUser(loginData, fakeResponse);

    expect(mockAuthService.loginUser).toHaveBeenCalledWith(
      expect.objectContaining(loginData),
      fakeResponse
    );
  });
});
