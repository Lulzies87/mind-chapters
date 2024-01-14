

async function app() {
  const chapters = await getJSON("/api/chapters");
  renderChapters(chapters, 5);
}

app();

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
      title: formData.get("title"),
      content: formData.get("content"),
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

function renderChapters(chapters: any, amount: number) {
  const latestsChapters = document.getElementById("latest-chapters");
  
  if (!latestsChapters) {
    throw new Error("Couldn't find latest chapters");
  }
  latestsChapters.innerHTML = chapters.slice(0, amount)
    .map((chapter: any) => 
    `<li class="chapter">
    <p>${chapter.title} (${chapter.author})</p>
    <time datetime="${chapter.timePosted}">${new Date(chapter.timePosted).toLocaleString('en-gb')}</time>
    </li>`
    )
    .join("\n");
    
}



async function getJSON(path: string) {
  const res = await fetch(path);

  return await res.json();
}
