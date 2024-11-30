import express from 'express';
import { StudentControlles } from './student.controller';

const router = express.Router();

router.post('/', StudentControlles.createStudent);

export const StudentRoute = router;
