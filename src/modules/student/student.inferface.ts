import { Types } from 'mongoose';

interface Guardian {
  fathersName: string;
  mothersName: string;
  phoneNo: string;
}
interface LocalGuardian {
  name: string;
  relation: string;
  phoneNo: string;
}
export interface TStudent {
  id: string;
  user: Types.ObjectId;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage: string;
  addmissionSemester: string;
  isDeleted: boolean;
}
