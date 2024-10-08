import CryptoJS from "crypto-js";
import { APP } from "../variables/constants";

export const stringEncryption = async (string: string): Promise<string> => {
  return CryptoJS.AES.encrypt(string, APP.CRYPTO_KEY)
    .toString()
    .replace(/\+/g, "xMl3Jk")
    .replace(/\//g, "Por21Ld")
    .replace(/=/g, "Ml32");
};

export const stringDecryption = async (string: string): Promise<string> => {
  string = string
    .replace(/xMl3Jk/g, "+")
    .replace(/Por21Ld/g, "/")
    .replace(/Ml32/g, "=");
  return CryptoJS.AES.decrypt(string, APP.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
};
