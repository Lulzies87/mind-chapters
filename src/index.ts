import "dotenv/config";
import { createServer } from "http";
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import { Chapter } from "./chapters.model";
import cookieParser from "cookie-parser";
import { User } from "./user.model";
import { router as authRouter } from "./auth.router";
import { router as chaptersRouter } from "./chapters.router";

export const sessionCookieName = "userId";
const app = express();

app.use(json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/auth", authRouter);
app.use("/api/chapters", chaptersRouter);

app.get("/api/currentUser", async (req, res, next) => {
  try {
      const user = await getUser(req.signedCookies[sessionCookieName]);

      res.status(200);
      res.json(user);
  } catch (error) {
      console.error(error);
      next(error);
  }
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

async function startServer() {
  if (!process.env.CONN_STRING) {
    throw new Error("Must provide a connection string");
  }

  await mongoose.connect(process.env.CONN_STRING, {
    dbName: "mind-chapters",
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer();

async function getUser(userId: string) {
  if (!userId) {
      return null;
  }
  const user = await User.findById(userId);

  if (!user) {
      throw new Error();
  }

  return user;
}