import { getJSON, redirectHome, redirectToLogin, renderChapters } from "./exports.js";

async function app() {
  redirectToLogin();

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

      const formData = new FormData(e.target as HTMLFormElement);
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
activateLogoutButton();
redirectHome();

function handleUser(user: any) {
  if (!user) {
    return;
  }

  document.body.classList.add("logged-in");
  document.getElementById(
    "username"
  )!.textContent = `Welcome ${user.username}!`;
}

function activateLogoutButton() {
  document.getElementById("logoutBtn")?.addEventListener("click", async () => {

    try {
      await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "same-origin",
      });

      new Promise<void>((resolve) => {
        window.location.href = "/api/auth/logout";
        resolve();
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  });
}