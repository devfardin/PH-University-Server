import { TAcademicFaculty } from './academicFaculty.interface';
import { model, Schema } from 'mongoose';

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Academic Faculty Name is Required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
