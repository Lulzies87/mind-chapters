import { getJSON, renderChapters } from "./chapters.js";

async function app() {
  const [user, chapters] = await Promise.all([
    getJSON("/api/currentUser"),
    getJSON("/api/chapters"),
  ]);

  handleUser(user);
  renderChapters(chapters, 5);

  document.forms
    .namedItem("create-chapter")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const body = JSON.stringify({
        author: user.username,
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
}

app();

function handleUser(user: any) {
  if (!user) {
    return;
  }

  document.body.classList.add("logged-in");
  document.getElementById("username")!.textContent = `Welcome ${user.username}!`;
}

// interface SubmitEvent {
//   target: HTMLFormElement;
// }
