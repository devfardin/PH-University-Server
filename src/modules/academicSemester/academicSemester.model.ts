import { model, Schema } from 'mongoose';
import { TAcademicSemseter } from './academicSemester.interface';
import {
  AcademicSemseterCode,
  AcademicSemsterName,
  Months,
} from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemseter>(
  {
    name: {
      type: String,
      enum: {
        values: AcademicSemsterName,
        message: '{VALUE} is not Valid name',
      },
      required: [true, 'Acedemic Semester Name is required'],
    },
    code: {
      type: String,
      enum: {
        values: AcademicSemseterCode,
        message: '{VALUE} is not valid code',
      },
      required: [true, 'Semester code is required'],
    },
    year: {
      type: String,
      required: [true, 'Semester year is required'],
    },
    startMonth: {
      type: String,
      enum: Months,
      required: [true, 'Start Months is required'],
    },
    endMonth: {
      type: String,
      enum: Months,
      required: [true, 'End Months is required'],
    },
  },
  {
    timestamps: true,
  },
);

// give error when will be save name and same year to created new semester
AcademicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semester Already Created');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemseter>(
  'accademicSemester',
  AcademicSemesterSchema,
);
