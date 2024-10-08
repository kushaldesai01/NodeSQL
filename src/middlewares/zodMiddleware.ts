import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { responseHandler } from "../services/responseHandler";

export const zodSchemaValidator =
  (schema: ZodSchema, requestPayload: { body?: boolean; query?: boolean }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let requestData = {};
      if (requestPayload.body) {
        requestData = { ...req.body };
      }
      if (requestPayload.query) {
        requestData = { ...requestData, ...req.query };
      }
      let result = schema.safeParse(requestData);
      if (!result.success) {
        const errors = result.error.errors.map((error) => ({
          path: error.path.join(","),
          message: error.message,
        }));
        let firstError = errors?.[0]?.message;
        if (!errors?.[0]?.message.includes(errors?.[0]?.path)) {
          firstError = errors?.[0]?.path + " : " + errors?.[0]?.message;
        }
        return responseHandler(res).failure(firstError);
      } else {
        next();
      }
    } catch (error: any) {
      return responseHandler(res).failure(error.message);
    }
  };
