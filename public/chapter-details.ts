import { Chapter } from "./chapters.js";

async function app() {
  const chapterId = window.location.hash.slice(1);
  const chapterDetails = await getChapterDetails(chapterId);

  renderChapterField("content");
  renderChapterField("title");

  function renderChapterField(field: keyof typeof chapterDetails) {
      const fieldElement = document.querySelectorAll(`.chapter-${field}`) as NodeListOf<HTMLElement>;

      if (!fieldElement) {
          throw new Error();
      }

      fieldElement.forEach((element) => element.innerText = chapterDetails[field].toString());
  }
};

app();

async function getChapterDetails(chapterId: string): Promise<Chapter> {
  const res = await fetch(`/api/chapters/${chapterId}`);

  return res.json();
}

function toggleLike() {
      const likeButton = document.querySelector('.like-button') as HTMLButtonElement;
      likeButton.classList.toggle('liked');
}