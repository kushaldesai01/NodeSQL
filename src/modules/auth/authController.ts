import { Request, Response } from "express";
import { responseHandler } from "../../services/responseHandler";
import { checkJWTExpire, generateJWT } from "./authService";
import { loginSchemaType, signupSchemaType } from "./authSchema";
import { stringDecryption, stringEncryption } from "../../services/functions";
import { prisma } from "../../database/connection";

export const signup = async (req: Request<{}, {}, signupSchemaType>, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const emailCounts = await prisma.users.count({ where: { email: email } });
    if (emailCounts > 0) {
      return responseHandler(res).failure("Email already exists");
    }
    const data = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: await stringEncryption(password),
        token: await generateJWT({ email: email }),
      },
    });
    return responseHandler(res).success("Signed up successfully", { token: data?.token });
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};

export const login = async (req: Request<{}, {}, loginSchemaType>, res: Response) => {
  try {
    const { email, password } = req.body;
    const findEmail = await prisma.users.findMany({ where: { email: email }, select: { password: true, token: true } });
    if (findEmail.length === 0) {
      return responseHandler(res).failure("Invalid credentials");
    }
    const decryptedPassword = await stringDecryption(findEmail[0]["password"]);
    if (password !== decryptedPassword) {
      return responseHandler(res).failure("Invalid credentials");
    }

    const isTokenExpired = await checkJWTExpire(findEmail[0]["token"] ?? "");
    let generatedToken: string;
    if (isTokenExpired) {
      generatedToken = await generateJWT({ email: email });
      await prisma.users.update({ where: { email: email }, data: { token: generatedToken } });
    } else {
      generatedToken = findEmail[0]["token"] as string;
    }
    return responseHandler(res).success("Logged in successfully", { token: generatedToken });
  } catch (error: any) {
    return responseHandler(res).failure(error.message);
  }
};
