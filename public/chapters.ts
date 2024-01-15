import { getJSON, handleUser, renderChapters } from "./app.js";

async function shmapp() {
  const [user, chapters] = await Promise.all([
    getJSON("/api/currentUser"),
    getJSON("/api/chapters"),
  ]);
  
  handleUser(user);
  renderChapters(chapters, chapters.length);
}

shmapp();

export type Chapter = {
    author: string,
    title: string,
    content: string,
    timePosted: Date
  };



