import { Schema } from 'mongoose';
import { StudentModel, TStudent, TUserName } from './student.inferface';

const UserNameSchema = new Schema<TUserName>({
    firstName:{
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
    }
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is required'],
    unique: true,
    ref: 'User',
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
});
