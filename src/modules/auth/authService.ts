import jwt from "jsonwebtoken";
import { APP } from "../../variables/constants";

export const generateJWT = async (data: { email: string }, expiresIn: string | number = "24h") => {
  return jwt.sign(data, APP.JWT_SECRET_KEY, { expiresIn: expiresIn });
};

export const checkJWTExpire = async (token: string) => {
  try{
    jwt.verify(token, APP.JWT_SECRET_KEY);
    return false;
  }
  catch(err){return true}
}
