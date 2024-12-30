import jwt from "jsonwebtoken";
import { APP } from "../../variables/constants";

export const generateJWT = async (data: { email: string }, expiresIn: string | number = "24h"): Promise<string> => {
  try {
    return jwt.sign(data, APP.JWT_SECRET_KEY, { expiresIn: expiresIn });
  } catch (error) {
    throw error;
  }
};

export const checkJWT = async (token: string): Promise<{ valid: boolean; data: string | jwt.JwtPayload | null }> => {
  try {
    const data = jwt.verify(token, APP.JWT_SECRET_KEY);
    return { valid: true, data: data };
  } catch (error) {
    return { valid: false, data: null };
  }
};

export const generateOtp = (length: number): string => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }
  return otp;
};
