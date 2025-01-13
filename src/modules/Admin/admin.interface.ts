import { Types } from 'mongoose';

export type TGender = 'male' | 'femail' | 'other';
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
export type TAdmin = {
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
  permantAddress: string,
  profile: string,
  isDeleted: boolean,
};
// export interface AdminModel extends Model<TAdmin> {
//   isUserExists(id: string): promise<TAdmin> | null;
// }
