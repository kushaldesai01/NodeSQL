import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { responseHandler } from "../services/responseHandler";
import { getErrorMessage } from "../services/functions";

export const zodSchemaValidator =
  (schema: ZodSchema, requestPayload: { body?: boolean; query?: boolean; params?: boolean }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let requestData = {};
      if (requestPayload.params) {
        requestData = { ...req.params };
      }
      if (requestPayload.query) {
        requestData = { ...requestData, ...req.query };
      }
      if (requestPayload.body) {
        requestData = { ...requestData, ...req.body };
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
    } catch (error) {
      return responseHandler(res).failure(getErrorMessage(error));
    }
  };
