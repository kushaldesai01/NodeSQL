import * as dotenv from 'dotenv';
dotenv.config();

export const APP = {
  PORT: 5000,
  APP_URL: "http://localhost:5000",
  JWT_SECRET_KEY: "AkEpJiGtUqE",
  CRYPTO_KEY: "QsYbhsUePWc"
};

export const MAIL_SERVICE = {
  EMAIL: "",
  PASSWORD: "",
}