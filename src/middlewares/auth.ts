import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import User from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';
import config from '../config';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    // checking if the token is missing
    if (!token) {
      throw new Error( 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;


    const { role, email} = decoded;

    // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('This user is not found !')
  }

  // checking if the user is inactive

  if (user?.isBlocked) {
    throw new Error('This user is blocked ! !')
  }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error(
        'You are not authorized',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;