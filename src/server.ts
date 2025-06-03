import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import expressPromBundle from 'express-prom-bundle';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import { router } from './routes';
import { swaggerSpec } from './middlewares';

const server = express();

const metricsMiddleware = expressPromBundle({
  includeMethod: true,
  includePath: true,
  customLabels: { project_name: 'Auth-Service', project_type: 'authentication' },
  promClient: { collectDefaultMetrics: {} },
});

const redocOptions = {
  title: 'Auth Service',
  specUrl: '/api-json',
};

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(metricsMiddleware);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }

  next();
});

server.get('/api-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use('/redoc', redoc(redocOptions));

server.use('/', router);

export { server };