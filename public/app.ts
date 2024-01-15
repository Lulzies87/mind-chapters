import { getJSON, renderChapters } from "./chapters.js";

async function app() {
  const [user, chapters] = await Promise.all([
    getJSON("/api/currentUser"),
    getJSON("/api/chapters"),
  ]);

  handleUser(user);
  renderChapters(chapters, 5);
}

app();

function handleUser(user: any) {
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

document.forms.namedItem("create-chapter")?.addEventListener("submit", async (e) => {
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