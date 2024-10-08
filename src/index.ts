import express, { NextFunction, Request, Response } from "express";
import { APP } from "./variables/constants";
const app = express();
import appRouter from "./services/router";
import { connectToDatabase } from "./database/connection";
import { responseHandler } from "./services/responseHandler";

connectToDatabase();
app.use(express.json());

// app router
app.use("/api", appRouter);

// catch any error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return responseHandler(res, err.status || 500).failure(err.message || "Internal error");
});

// URL not found error
app.use("*", (req: Request, res: Response) => {
  return responseHandler(res, 404).failure("URL not found");
});

app.listen(APP.PORT, () => {
  console.log(APP.APP_LINK);
});
