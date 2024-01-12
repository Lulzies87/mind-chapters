const chapters = [
    {
        author: "Lilach",
        title: "My first chapter!",
        content: "Today marked a transformative journey of self-discovery. Reflecting on moments of growth and introspection, I uncovered hidden strengths within. Gratitude for the challenges that sculpted my resilience. As the sun sets, I embrace the evolving chapters, eager for the unwritten pages that await.",
        timePosted: new Date()
    },
    {
        author: "Omer",
        title: "Teaching NodeJS",
        content: "In the classroom today, the energy pulsed with the excitement of Node.js exploration. Guiding eager minds through the intricacies of asynchronous JavaScript, we delved into event-driven programming and the magic of the event loop. Witnessing the spark of understanding in my students fuels my passion for teaching this dynamic technology.",
        timePosted: new Date()
    },
    {
        author: "Assaf",
        title: "Cat won't get out of the kitchen sink",
        content: "Frustration tinged with amusement today as my mischievous feline companion, Whiskers, persistently claimed the kitchen sink as her favorite spot. Despite numerous attempts to dissuade her, the allure of that stainless-steel basin proved irresistible. Our ongoing battle for sink supremacy has become a humorous daily ritual, a reminder of the whimsical quirks that make life with a cat endlessly entertaining.",
        timePosted: new Date()
    },
    {
        author: "Gilad",
        title: "Too focused",
        content: "A twist of irony unfolded as I eagerly consumed Ritalin before my Node.js class, aiming to conquer the intricacies of asynchronous programming. Upon arrival, a stark realization hit—class canceled. The enhanced focus lingered, a caffeine-like buzz without an outlet. Lesson learned: always check for updates before diving into stimulants, for unpredictability can be the true master of irony.",
        timePosted: new Date()
    },
    {
        author: "Yotam",
        title: "Still behind",
        content: "Feeling the weight of deadlines pressing down as I navigate the Node.js class, the struggle is palpable. Falling behind on modules and struggling to catch up, the lines of code blur into an overwhelming sea of confusion. Determination fuels late-night coding sessions, but the challenge is real. Each setback is a lesson, and with resilience, I'm determined to bridge the gap and grasp the intricacies of Node.js.",
        timePosted: new Date()
    },
    {
        author: "Assaf",
        title: "Sick again",
        content: "Frustration mounts as I find myself confined to the familiar four walls of my room once again. A persistent illness, like an unwelcome guest, has returned to disrupt my academic pursuits. The coughs echo the setbacks, and the sniffles create a rhythm of discontent. Amidst the sniffed tissues and aching limbs, the desire for a healthier tomorrow persists, carrying the weight of missed lectures and assignments. Another day of healing, another page in the journal of resilience.",
        timePosted: new Date()
    },
];

function renderChapters(chapters: any) {
    const latestsChapters = document.getElementById("latest-chapters");

    if (!latestsChapters) {
        throw new Error("Couldn't find latest chapters");
    }

    latestsChapters.innerHTML = chapters.map((chapter: any) => `<li class="chapter">
    <p>${chapter.title} (${chapter.author})</p>
    <p>${chapter.timePosted.toLocaleString()}</p>
    </li>`).join("\n");
}

renderChapters(chapters);
