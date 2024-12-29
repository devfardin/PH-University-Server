/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();
// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:6000', 'http://localhost:5173'] }));

// application Routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
};
app.get('/test', test);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our server! The API is up and running smoothly. 🚀',
    timestamp: `Started at ${new Date().toLocaleString()}`,
  });
});

// Global Error handlar
app.use(notFound);
app.use(globalErrorHandler);

export default app;
