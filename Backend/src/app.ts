import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/note";
import userRouter from "./routes/user";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not founds please try again"));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknow error is occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
export default app;
