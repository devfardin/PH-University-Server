import { TUser } from './user.interface';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// export all user model function
export const User = model<TUser>('user', userSchema);
