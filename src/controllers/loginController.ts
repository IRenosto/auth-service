import { Request, Response } from 'express';
import { IBodyLogin } from '../interfaces';
import { errorHandler } from '../middlewares/errorHandler';
import { loginService } from '../services/loginService';

export const loginController = async (req: Request<{}, {}, IBodyLogin>, res: Response) => {
  try {
    const accessToken = await loginService(req.body.email, req.body.senha);
        
    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    errorHandler(error, res)
  }
};