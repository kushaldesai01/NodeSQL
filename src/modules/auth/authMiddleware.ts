import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import { APP } from "../../variables/constants";
import { prisma } from "../../database/connection";
import { checkJWT } from "./authService";
import { getErrorMessage } from "../../services/functions";

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
    const checkToken = await checkJWT(token);
    if (!checkToken.valid) {
      return responseHandler(res, 401).failure("Invalid token");
    }
    let findToken = await prisma.users.findFirst({ where: { token: token } });
    if (!findToken) {
      return responseHandler(res, 401).failure("Invalid token");
    }
    try {
      if (!findToken) {
        return responseHandler(res, 401).failure("Invalid token");
      }
    } catch (err) {
      return responseHandler(res, 401).failure("Invalid token");
    }
    req.user_id = findToken.id;
    req.email = findToken.email;
    return next();
  } catch (error) {
    return responseHandler(res, 401).failure(getErrorMessage(error));
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
