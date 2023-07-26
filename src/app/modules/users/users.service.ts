import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';

const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch users');
  }
};

const getUserProfile = async (phoneNumber: string): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ phoneNumber });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch user');
  }
};

const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch user');
  }
};

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    userData.password = !userData.password
      ? config.default_user_pass
      : userData.password;

    const result = await User.create(userData);
    return result;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create user'
    );
  }
};

const updateUser = async (
  id: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update user');
  }
};

const updateUserProfile = async (
  id: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update user');
  }
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  }
};

export const UserService = {
  getAllUsers,
  getUserProfile,
  getUserById,
  createUser,
  updateUser,
  updateUserProfile,
  deleteUser,
};
