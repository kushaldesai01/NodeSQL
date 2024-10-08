import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import { APP } from "../../variables/constants";
import { prisma } from "../../database/connection";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = (req.headers["Token"] as string) || (req.headers["Authorization"] as string);
    if (!token) {
      return responseHandler(res, 401).failure("Token required");
    }
    let headerArr = token?.split(" ");
    if (headerArr.length > 1) {
      token = headerArr[1];
    } else {
      token = headerArr[0];
    }
    try {
      let val = await prisma.users.findMany({ where: { token: token } });
      if (val.length === 0) {
        return responseHandler(res, 401).failure("Invalid token");
      }
      jwt.verify(token, APP.JWT_SECRET_KEY);
      req.user_id = val[0]["id"];
      req.email = val[0]["email"];
      return next();
    } catch (err) {
      return responseHandler(res, 401).failure("Invalid token");
    }
  } catch (error: any) {
    return responseHandler(res, 401).failure(error.message);
  }
};

// export const verifyAdmin = async (req: any, res: Response, next: NextFunction) => {
//   try {
//     let val = await prisma.users.findMany({ where: { _id: req.user_id } });
//     if (val?.[0]?.type !== "admin") {
//       return responseHandler(res).failure("You don't have enough permission to perform this action");
//     }
//     return next();
//   } catch (error: any) {
//     return responseHandler(res).failure(error.message);
//   }
// };
