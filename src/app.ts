import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouters } from './modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application Routes
app.use('/users', UserRouters);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our server! The API is up and running smoothly. 🚀',
    timestamp: `Started at ${new Date().toLocaleString()}`,
  });
});

export default app;
