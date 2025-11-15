import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.ts";
import type { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    name: string;
    email: string;
    _id: string | Types.ObjectId;
  };
}

interface User {
  name: string;
  email: string;
  _id: string | Types.ObjectId;
}

const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized.");
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      if (!decode) {
        res.status(401);
        throw new Error("Not authorized. Invalid Token");
      }
      req.user = (await User.findById(decode.userId).select(
        "-password"
      )) as User;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized.");
    }
  }
);

export { protect };
