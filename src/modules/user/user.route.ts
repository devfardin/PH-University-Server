import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
const router = express.Router();

const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation
    const zodParsedData = await schema.parseAsync({
        {
          body: req.body
        }
    })
  };
};

router.post('/', validationRequest('Fardin'), userController.createNewUser);

export const UserRouters = router;
