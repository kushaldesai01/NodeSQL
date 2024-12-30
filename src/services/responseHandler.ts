import { Response } from "express";

export const responseHandler = (
  res: Response,
  statusCode: number | null = null
): {
  success: (message: string | string[] | null, data?: any) => void;
  failure: (message: string | string[] | null, data?: any) => void;
} => {
  return {
    success: (message: string | string[] | null, data: any = null) => {
      res.status(statusCode ?? 200).json({ success: true, message: message, data: data });
    },
    failure: (message: string | string[] | null, data: any = null) => {
      res.status(statusCode ?? 422).json({ success: false, message: message, data: data });
    },
  };
};
