import CryptoJS from "crypto-js";
import { APP, MAIL_SERVICE } from "../variables/constants";
import nodemailer from "nodemailer";

export const stringEncryption = async (string: string): Promise<string> => {
  try {
    return CryptoJS.AES.encrypt(string, APP.CRYPTO_KEY)
      .toString()
      .replace(/\+/g, "xMl3Jk")
      .replace(/\//g, "Por21Ld")
      .replace(/=/g, "Ml32");
  } catch (error) {
    throw error;
  }
};

export const stringDecryption = async (string: string): Promise<string> => {
  try {
    string = string
      .replace(/xMl3Jk/g, "+")
      .replace(/Por21Ld/g, "/")
      .replace(/Ml32/g, "=");
    return CryptoJS.AES.decrypt(string, APP.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw error;
  }
};

export const sendMail = async (mailOptions: {
  from: string;
  to: string;
  subject?: string;
  text?: string;
  html?: any;
}): Promise<void> => {
  try {
    const mailer = nodemailer.createTransport({
      secure: false,
      auth: {
        user: MAIL_SERVICE.EMAIL,
        pass: MAIL_SERVICE.PASSWORD,
      },
      host: "smtp.gmail.com",
      port: 587,
    });
    await mailer.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error occurred";
  }
};
