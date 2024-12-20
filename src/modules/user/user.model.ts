import { TUser, UserModel } from './user.interface';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const UserSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, 'Student Id required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0, // for remove client this field
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
      default: 'in-progress',
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

UserSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_roounds),
  );
  next();
});
// export all user model function
UserSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password'); // + for get all user fileds
};
export const User = model<TUser, UserModel>('Users', UserSchema);
