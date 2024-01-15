export type Chapter = {
  author: string;
  title: string;
  content: string;
  timePosted: Date;
};

export function renderChapters(chapters: any, amount: number) {
  const latestsChapters = document.getElementById("chapters-list");

  if (!latestsChapters) {
    throw new Error("Couldn't find chapters-list");
  }

  latestsChapters.innerHTML = chapters
    .slice(0, amount)
    .map(
      (chapter: any) => `
        <li class="chapter">
          <a class="chapterLi" href="/chapter-details.html#${chapter._id}">${
        chapter.title
      } (${chapter.author})</a>
          <time datetime="${chapter.timePosted}">${new Date(
        chapter.timePosted
      ).toLocaleString("en-gb")}</time>
        </li>`
    )
    .join("\n");
}

export async function getJSON(path: string) {
  const res = await fetch(path);

  return await res.json();
}

export async function redirectHome() {
    const user = await getJSON("/api/currentUser");
    const currentWindowLocation = window.location.href;
  
    if (user && (currentWindowLocation.includes("login.html") || currentWindowLocation.includes("register.html"))) {
      window.location.replace("/");
    }
}

export async function redirectToLogin() {
    const user = await getJSON("/api/currentUser");
    const currentWindowLocation = window.location.href;
  
    if (!user) {
      window.location.replace("/login.html");
    }
}