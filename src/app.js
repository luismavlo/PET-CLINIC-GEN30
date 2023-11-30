import express from 'express';
import morgan from 'morgan';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/error.controller.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//rutas
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
