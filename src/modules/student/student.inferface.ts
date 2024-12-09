/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TGuardian {
  fathersName: string;
  mothersName: string;
  phoneNo: string;
}
export interface TLocalGuardian {
  name: string;
  relation: string;
  phoneNo: string;
}
export interface TUserName {
  firstName: string;
  middlename?: string;
  lastName: string;
}

export interface TStudent {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  addmissionSemester: Types.ObjectId;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
}

// for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
