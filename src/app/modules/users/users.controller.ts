import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import { startSession } from 'mongoose';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwt.helper';
import { statusObject } from '../../../helpers/status.helper';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './users.interface';
import { User } from './users.model';
import { UserService } from './users.service';

const getAllUsers = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await UserService.getAllUsers();
      sendResponse<IUser[]>(res, {
        ...statusObject(200, true, 'all users found successfully!'),
        data: result,
      });
    } catch (err) {
      sendResponse<IUser[]>(res, {
        ...statusObject(500, false, 'Failed to fetch users'),
        error: err as Error,
      });
    }
  }
);

const getUserProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization;

    const verifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret
    );

    try {
      const result = await UserService.getUserProfile(verifiedUser.phoneNumber);
      if (result) {
        sendResponse<IUser>(res, {
          ...statusObject(200, true, 'profile found successfully!'),
          data: result,
        });
      } else {
        sendResponse<IUser>(res, {
          ...statusObject(200, true, 'profile not found!'),
          data: {},
        });
      }
    } catch (err) {
      sendResponse<IUser>(res, {
        ...statusObject(400, false, 'failed to find user!'),
        error: err as Error,
      });
    }
  }
);

const getUserById = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const result = await UserService.getUserById(id);
      if (result) {
        sendResponse<IUser>(res, {
          ...statusObject(200, true, 'user found successfully!'),
          data: result,
        });
      } else {
        sendResponse<IUser>(res, {
          ...statusObject(200, true, 'user not found!'),
          data: {},
        });
      }
    } catch (err) {
      sendResponse<IUser>(res, {
        ...statusObject(400, false, 'failed to find user!'),
        error: err as Error,
      });
    }
  }
);

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;

    try {
      const result = await UserService.createUser(userData);

      sendResponse<IUser>(res, {
        ...statusObject(201, true, 'user created successfully!'),
        data: result,
      });
    } catch (err) {
      sendResponse<IUser>(res, {
        ...statusObject(201, true, 'failed to create user!'),
        error: err as Error,
      });
    }
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userData: Partial<IUser> = req.body;
    try {
      const result = await UserService.updateUser(id, userData);
      if (result) {
        sendResponse<IUser>(res, {
          ...statusObject(201, true, 'user updated successfully!'),
          data: result,
        });
      } else {
        sendResponse<IUser>(res, {
          ...statusObject(201, true, 'user not found!'),
          data: {},
        });
      }
    } catch (err) {
      sendResponse<IUser>(res, {
        ...statusObject(201, false, 'failed to update user!'),
        error: err as Error,
      });
    }
  }
);

const updateUserProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization;
    const { phoneNumber } = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as Secret
    );
    const user = await User.findOne({ phoneNumber });
    const id = user?._id;

    const userData: Partial<IUser> = req.body;
    try {
      const result = await UserService.updateUserProfile(id, userData);
      if (result) {
        sendResponse<IUser>(res, {
          ...statusObject(201, true, 'user updated successfully!'),
          data: result,
        });
      } else {
        sendResponse<IUser>(res, {
          ...statusObject(201, true, 'user not found!'),
          data: {},
        });
      }
    } catch (err) {
      sendResponse<IUser>(res, {
        ...statusObject(201, false, 'failed to update user!'),
        error: err as Error,
      });
    }
  }
);

const updateIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const session = await startSession();

  const { id } = req.params;
  const userData: Partial<IUser> = req.body;

  try {
    session.startTransaction();
    await UserService.updateUser(id, userData);

    await session.commitTransaction();
    session.endSession();

    sendResponse<IUser>(res, {
      ...statusObject(201, true, 'Transaction committed successfully'),
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    sendResponse<IUser>(res, {
      ...statusObject(201, false, 'Transaction aborted'),
      error: err as Error,
    });
  }
  next();
};

const deleteUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const result = await User.findByIdAndDelete(id);
      if (result) {
        sendResponse<IUser>(res, {
          ...statusObject(201, true, 'user deleted successfully'),
          data: result,
        });
      } else {
        sendResponse<IUser>(res, {
          ...statusObject(201, false, 'user not found'),
          data: result,
        });
      }
    } catch (err) {
      sendResponse<IUser>(res, {
        ...statusObject(201, false, 'failed to delete user'),
        error: err as Error,
      });
    }
  }
);

export const userController = {
  getAllUsers,
  getUserProfile,
  getUserById,
  createUser,
  updateUser,
  updateUserProfile,
  updateIncome,
  deleteUser,
};
