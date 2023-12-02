import express from 'express';
import morgan from 'morgan';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/error.controller.js';
import { envs } from './config/enviroments/enviroments.js';
import { enableCors } from './config/plugins/cors.plugin.js';

const app = express();
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8080',
  'http://localhost:5173',
  'https://monumental-stardust-f3477f.netlify.app',
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//rutas
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
