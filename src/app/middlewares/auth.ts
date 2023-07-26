import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../helpers/jwt.helper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'You are not authorized',
        });
        // throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token as string,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser; // role, phoneNumber

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        res.status(403).json({
          statusCode: httpStatus.FORBIDDEN,
          success: false,
          message: 'Forbidden Access',
        });
        // throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
