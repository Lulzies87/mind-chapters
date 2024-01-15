import { Router } from "express";
import { User } from "./user.model";
import { sessionCookieName } from "./index";

export const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      res.status(400);
      res.send("Must provide email, username and password");
      return;
    }

    const user = await User.create({
      email,
      username,
      password,
    });

    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + 1);

    res.cookie(sessionCookieName, user._id, {
      httpOnly: true,
      secure: false,
      signed: true,
      expires,
    });

    res.status(201);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      res.status(401);
      res.send("username and password doesn't match");
      return;
    }

    res.cookie("userId", user._id, {
      signed: true,
      secure: false,
      httpOnly: true,
    });
    res.status(200);
    res.send();
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (_, res) => {
  res.cookie("userId", "", { expires: new Date(0) });
  res.send("logged-out");
});