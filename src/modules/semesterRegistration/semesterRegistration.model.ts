import { model, Schema } from 'mongoose';
import { TSemesterRegistrantion } from './semesterRegistration.interface';
import { SemesterRggistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistrantion>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Semester is required'],
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: {
        values: SemesterRggistrationStatus,
        message: '{VALUE}',
      },
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: [true, 'Start Date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End Date is required'],
    },
    minCredit: {
      type: Number,
      required: [true, 'min credit is required'],
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);
export const SemesterRegistrationModel = model<TSemesterRegistrantion>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
