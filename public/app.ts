
async function app() {
  const [user, chapters] = await Promise.all([
    getJSON("/api/currentUser"),
    getJSON("/api/chapters"),
  ]);
  
  handleUser(user);
  renderChapters(chapters, 5);
}

app();

export function handleUser(user: any) {
  if (!user) {
    return;
  }

  document.body.classList.add("logged-in");
  document.getElementById("username")!.textContent = `Welcome ${user.username}`;

  document.forms
    .namedItem("create-post")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const body = JSON.stringify({
        subject: formData.get("subject"),
        content: formData.get("content"),
      });

      await fetch("/api/posts", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": body.length.toString(),
        },
      });

      window.location.reload();
    });
}
interface SubmitEvent {
  target: HTMLFormElement;
}

document.forms
  .namedItem("create-chapter")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const body = JSON.stringify({
      author: "Test",
      title: (formData.get("title") as String).replaceAll("<", "&lt;"),
      content: (formData.get("content") as String).replaceAll("<", "&lt;"),
    });

    await fetch("/api/chapters", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length.toString(),
      },
    });

    window.location.reload();
  });

export function renderChapters(chapters: any, amount: number) {
  const latestsChapters = document.getElementById("chapters-list");

  if (!latestsChapters) {
    throw new Error("Couldn't find chapters-list");
  }

  latestsChapters.innerHTML = chapters.slice(0, amount).map(
      (chapter: any) => `<li class="chapter">
      <a class="chapterLi" href="/chapter-details.html#${chapter._id}">${chapter.title} (${chapter.author})</a>
    <time datetime="${chapter.timePosted}">${new Date(chapter.timePosted).toLocaleString("en-gb")}</time>
    </li>`).join("\n");
}

// document.getElementById("logoutBtn")?.addEventListener("click", async (e) => {
//   e.preventDefault();

//   try {
//     await fetch("/logout", {
//       method: "GET",
//       credentials: "same-origin",
//     });

//     new Promise<void>((resolve) => {
//       window.location.href = "/logout";
//       resolve();
//     }).then(() => {
//       window.location.reload();
//     });

//   } catch (error) {
//     console.error("An error occurred during logout", error);
//   }
// });

export async function getJSON(path: string) {
  const res = await fetch(path);

  return await res.json();
}
