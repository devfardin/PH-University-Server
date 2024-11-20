import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

// will call controller function
router.post('/create-student', StudentController.createStudent);

// get all student data from db
router.get('/', StudentController.getAllStudentData);
// get a Student from DB
router.get('/:id', StudentController.getSingleStudentFromDB);

export const StudentRoute = router;
