/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
const router = express.Router();

router.post('/', userController.createNewUser);

export const UserRouters = router;
