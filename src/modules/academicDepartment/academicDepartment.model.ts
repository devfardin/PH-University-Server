import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
