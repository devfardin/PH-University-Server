import express from 'express';
import { facultyController } from './faculty.controller';
import auth from '../Auth/auth';
const router = express.Router();

router.get('/', auth(), facultyController.getALLFaculties);
export const FacultyRouter = router;
