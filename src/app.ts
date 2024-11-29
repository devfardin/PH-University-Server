import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouters } from './modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application Routes
app.use('/api/v1/users', UserRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

// console.log(process.cwd())

export default app;
