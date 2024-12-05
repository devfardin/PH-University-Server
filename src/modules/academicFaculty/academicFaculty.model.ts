import { TAcademicFaculty } from './academicFaculty.interface';
import { model, Schema } from 'mongoose';

const AcademicFacultySchema = new Schema<TAcademicFaculty>({
  name: {
    type: String,
    required: [true, 'Academic Faculty Name is Required'],
  },
});
export const AcademicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  AcademicFacultySchema,
);
