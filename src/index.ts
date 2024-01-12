import "dotenv/config";
import { createServer } from "http";
import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(json());

app.get("/api/hello", (req, res) => {
    res.send("world");
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

async function startServer() {
    if (!process.env.CONN_STRING) {
        throw new Error ("Must provide a connection string");
    }

    await mongoose.connect(process.env.CONN_STRING, {
        dbName: "mind-chapters"
    });
}

server.listen(port, () => console.log(`Listening on port ${port}`));