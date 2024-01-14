import "dotenv/config";
import { createServer } from "http";
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import { Chapter } from "./chapters.model";

const app = express();

app.use(json());

app.get("/api/chapters", async (req, res, next) => {
  // Go to a page with a list of all chapters.
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

app.get("/api/chapters/:chapterId", (req, res) => {
  // Show details of a specific chapter.
});

app.get("/api/chapters/:userId", (req, res) => {
  // Show a chapters list of a specific user.
});

app.post("/api/chapters", async (req, res, next) => {
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

app.patch("/api/chapters/:chapterId");

// More ideas:
// Like a chapter, show number of likes on chapter.
// Edit chapter.
//

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
