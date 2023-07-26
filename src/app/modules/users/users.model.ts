import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { Roles } from './users.constant';
import { IUser, UserModel } from './users.interface';

const UserSchema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    role: { type: String, enum: Roles, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

// Define static methods on UserSchema as UserModel
UserSchema.statics.isUserExist = async function (phoneNumber: string) {
  const user = await User.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1, phoneNumber: 1 }
  ).lean();
  return user;
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(givenPassword, savedPassword);
    return isMatch;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Create UserModel using the interface and schema
export const User = model<IUser, UserModel>('User', UserSchema);
