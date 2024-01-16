import { Chapter, getJSON, redirectToLogin, saveLike } from "./exports.js";

async function app() {
  redirectToLogin();

  const chapterId = window.location.hash.slice(1);
  const userId = await getJSON("/api/currentUser");
  const chapterDetails = await getChapterDetails(chapterId);

  renderChapterField("content");
  renderChapterField("title");

  function renderChapterField(field: keyof typeof chapterDetails) {
    const fieldElement = document.querySelectorAll(
      `.chapter-${field}`
    ) as NodeListOf<HTMLElement>;

    if (!fieldElement) {
      throw new Error();
    }

    fieldElement.forEach(
      (element) => (element.innerText = chapterDetails[field].toString())
    );
  }
  
  document.querySelector(".like-button")?.addEventListener("click", (e) => {
    toggleLike(e.target, chapterId, userId);
  });

  document.getElementById("likes-amount")!.innerText = chapterDetails.likes.length.toString();
}

app();



async function getChapterDetails(chapterId: string): Promise<Chapter> {
  const res = await fetch(`/api/chapters/${chapterId}`);

  return res.json();
}


async function toggleLike(likeButton: any, chapterId: string, userId: string) {
  likeButton.classList.toggle("liked");
  await saveLike(chapterId, userId);
}
