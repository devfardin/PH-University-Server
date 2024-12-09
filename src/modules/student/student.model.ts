import { model, Schema } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.inferface';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
  },
  middlename: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});
const UserLocalGuardian = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
  },
  relation: {
    type: String,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: [true, 'local Guardiant number is required'],
  },
});
const Guardiant = new Schema<TGuardian>({
  fathersName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  mothersName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required'],
  },
  phoneNo: {
    type: String,
    required: [true, 'Parents number is required'],
  },
});

const StudentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    unique: true,
    ref: 'Users',
  },
  name: {
    type: UserNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  presentAddress: {
    type: String,
    trim: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
  },
  guardian: {
    type: Guardiant,
  },
  localGuardian: {
    type: UserLocalGuardian,
    required: [true, 'local guardiant information is required'],
  },
  profileImage: {
    type: String,
  },
  addmissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    trim: true,
    required: [true, 'Semester is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
});

// export all user model function
export const Student = model<TStudent>('Students', StudentSchema);
