import { Router } from 'express';
import { register } from '../middlewares';
import { loginHandler } from '../controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticacao
 *     description: Gerenciamento de autenticação.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de sucesso
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
router.get('/', (_, res) => {
    return res.status(200).send('Serviço de autenticação funcionando corretamente.');
});

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Retorna métricas do Prometheus
 *     responses:
 *       200:
 *         description: Métricas do Prometheus
 */
router.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

//Autenticacao
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso
 */
router.post('/login', loginHandler.loginValidation, loginHandler.loginController);

export { router };