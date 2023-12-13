import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose'; // Asegúrate de importar el token correcto

describe('rutas de autenticación', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getModelToken('NombreDeTuModelo'), // Reemplaza 'NombreDeTuModelo' con el nombre real de tu modelo
          useValue: {} // Puedes proporcionar un objeto de modelo vacío o un objeto de modelo simulado aquí
        }
      ]
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
    xit('debería devolver un usuario y establecer una cookie', async () => {
      const usuarioMock = {
        _id: 'id_usuario_mock',
        name: 'NombreUsuario',
        email: 'correo@ejemplo.com',
        checkpass: jest.fn() // Puedes simular el comportamiento de checkpass si es necesario
      };

      // jest.spyOn(authService, 'loginUser').mockImplementation(async () => {
      //   return usuarioMock;
      // });

      // // Puedes simular el comportamiento de findOne según tus necesidades
      // jest.spyOn(authService['userModel'], 'findOne').mockImplementation(async () => usuarioMock);

      // const respuesta = await authController.findOne();
      // expect(respuesta).toBe(usuarioMock);

      // Asegúrate de que se llamó a checkpass con la contraseña correcta
      //  expect(usuarioMock.checkpass).toHaveBeenCalledWith('contraseña_correcta');
    });
  });
});
