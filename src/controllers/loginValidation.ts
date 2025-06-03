import { z } from 'zod';
import { validation } from '../middlewares';

export const loginValidation = validation({
    body: z.object({
        email: z.string().min(5).email('Email inválido'),
        senha: z.string(),
    }),
});
