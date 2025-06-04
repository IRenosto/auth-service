import { loginController } from '../src/controllers/loginController';
import * as loginServiceModule from '../src/services/loginService';
import * as errorHandlerModule from '../src/middlewares/errorHandler';
import { Request, Response } from 'express';

describe('loginController', () => {
  const mockRequest = (body: any) => ({ body } as Request);
  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const email = 'test@example.com';
  const senha = '123456';
  const fakeToken = 'fake-jwt-token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar accessToken com status 200 em caso de sucesso', async () => {
    const req = mockRequest({ email, senha });
    const res = mockResponse();

    jest.spyOn(loginServiceModule, 'loginService').mockResolvedValue(fakeToken);
    const errorHandlerSpy = jest.spyOn(errorHandlerModule, 'errorHandler').mockImplementation();

    await loginController(req, res);

    expect(loginServiceModule.loginService).toHaveBeenCalledWith(email, senha);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ accessToken: fakeToken });
    expect(errorHandlerSpy).not.toHaveBeenCalled();
  });

  it('deve chamar errorHandler em caso de erro', async () => {
    const req = mockRequest({ email, senha });
    const res = mockResponse();
    const error = new Error('Login failed');

    jest.spyOn(loginServiceModule, 'loginService').mockRejectedValue(error);
    const errorHandlerSpy = jest.spyOn(errorHandlerModule, 'errorHandler').mockImplementation();

    await loginController(req, res);

    expect(loginServiceModule.loginService).toHaveBeenCalledWith(email, senha);
    expect(errorHandlerSpy).toHaveBeenCalledWith(error, res);
    expect(res.status).not.toHaveBeenCalledWith(200);
  });
});
