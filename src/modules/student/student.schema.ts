import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  fatherContact: { type: String },
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  motherContact: { type: String },
});

const localGuardianScheme = new Schema<LocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contact: { type: String },
  email: { type: String },
  address: { type: String },
});

const isBangladeshiPhone = (phone: string) => {
  const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
  return bdPhoneRegex.test(phone);
};
const emailValidation = (email: string) => {
  const check = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  return check.test(email);
};

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student Id is Required'],
    unique: true,
    trim: true,
  },
  name: {
    type: userNameSchema,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: isBangladeshiPhone,
      message: '{VALUE} is not a valid number',
    },
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    validate: {
      validator: emailValidation,
      message: 'Please fill a valid email address',
    },
  },
  address: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: [true, 'Gender filed is required'],
  },

  guardian: guardianSchema,
  localGuardian: localGuardianScheme,

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    trim: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
  },
  profile: { type: String },
  isActive: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
