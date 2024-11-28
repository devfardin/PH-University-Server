import { TUser } from './user.interface';
import { User } from './user.model';
const createUsersIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

// export User Services function
export const userServices = {
  createUsersIntoDB,
};
