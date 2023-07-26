import { Document, Model } from 'mongoose';
import { Roles } from './users.constant';

export type IUser = {
  phoneNumber: string;
  role: Roles.Admin;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
} & Document;

// Define UserModel interface with static methods
export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Pick<IUser, '_id' | 'password' | 'role' | 'phoneNumber'>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
