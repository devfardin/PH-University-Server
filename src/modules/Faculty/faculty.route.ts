import express from 'express';
import { facultyController } from './faculty.controller';
const router = express.Router();

router.get('/', facultyController.getALLFaculties);
export const FacultyRouter = router;
