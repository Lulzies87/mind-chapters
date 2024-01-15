import { getJSON, renderChapters } from "./chapters.js";

async function app() {
    const chapters = await getJSON("/api/chapters");

    renderChapters(chapters, chapters.length);
  }
  
  app();