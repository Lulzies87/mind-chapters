import { Router } from "express";
import { Chapter } from "./chapters.model";
import { Error, Types } from "mongoose";

export const router = Router();

router.param("chapterId", async (req, res, next, chapterId) => {
  try {
    req.chapter = await Chapter.findById(chapterId);
    if (!req.chapter) {
      res.status(404);
      res.send(`Chapter with id ${chapterId} not found.`);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const chapters = await Chapter.find({}, undefined, {
      sort: { timePosted: "desc" },
    });

    res.status(200);
    res.send(chapters);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:chapterId", (req, res) => {
  res.send(req.chapter);
});

router.post("/", async (req, res, next) => {
  const { author, title, content, timePosted } = req.body;

  try {
    if (!title || !content) {
      res.status(400);
      res.send("Must provide title and content");
      return;
    }

    await Chapter.create({
      author,
      title,
      content,
      timePosted,
    });

    res.status(201);
    res.end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:chapterId/likes", async (req, res, next) => {
  try {
    const userId = req.body.user._id;

    if (!req.chapter) {
      throw new Error("Chapter not found");
    }

    const index = req.chapter.likes.indexOf(userId);
    if (index === -1) {
      req.chapter.likes.push(userId);
    } else {
      req.chapter.likes.splice(index, 1);
    }
    await req.chapter.save();
    res.status(201);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("Something went wrong");
  }
});
