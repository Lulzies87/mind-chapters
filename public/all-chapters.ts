import { getJSON, redirectToLogin, renderChapters } from "./exports.js";

async function app() {
  redirectToLogin();

  const chapters = await getJSON("/api/chapters");
  renderChapters(chapters, chapters.length);
}

app();
