import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/customErrors';
import { IUserResponse } from '../interfaces';

export const loginService = async (email: string, senha: string): Promise<string> => {
        const response = await axios.post<IUserResponse>(
            `${process.env.USER_SERVICE_URL}/usuarios/email/`,
            {email})
            .catch(() => {
                throw new UnauthorizedError('Usuário ou senha inválidos.')
              });

        const user = response.data;

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            throw new UnauthorizedError('Usuário ou senha inválidos.');
        }

        await axios.patch(
            `${process.env.USER_SERVICE_URL}/usuarios/${user.id}/updateLogin`)

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h'
            }
        );

        return token;
};