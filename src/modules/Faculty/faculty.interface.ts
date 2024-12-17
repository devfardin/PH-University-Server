import { Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type TUserName = {
  firstName: string,
  middleName: string,
  lastName: string,
};
export type TFaculty = {
  id: string,
  user: Types.ObjectId,
  designation: string,
  name: TUserName,
  gender: TGender,
  dateOfBirth?: Date,
  email: string,
  phoneNo: string,
  emergencyPhoneNo: string,
  bloodGroup?: TBloodGroup,
  presentAddress: string,
  permanetAddress: string,
  profileImg: string,
  academicDepartment: Types.ObjectId,
  isDeleted: boolean,
};
