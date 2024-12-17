import { Schema } from 'mongoose';
import { TFaculty, TUserName } from './faculty.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});
const facultySchema = new Schema<TFaculty>({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user is is required'],
    unique: true,
    ref: 'Users',
  },
  designation: {
    type: String,
    required: [true, 'Designatiion is required'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
});
