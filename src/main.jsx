import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const textSlides = [
  {
    eyebrow: "A little note for you",
    title: "Today is all about celebrating you.",
    message: "Here's to the you that makes a happy and enjoyable vibe.",
    art: "lily",
    className: "flowers",
  },
  {
    eyebrow: "Make a wish",
    title: "You deserve all the lovely things.",
    message: "May the year ahead bring you laughter, love, and happy little surprises.",
    art: "✨",
    className: "sparkles",
  },
  {
    eyebrow: "One more thing…",
    title: "The world is brighter with you in it.",
    message: "Keep being pretty, cutie and amazing.",
    art: "🎂",
    className: "cake",
  },
  
];

const pictures = Object.entries(
  import.meta.glob("./assets/birthday/*", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .filter(([path]) => /\.(avif|gif|jpe?g|jfif|png|webp)$/i.test(path))
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, src], index) => ({
    eyebrow: "A little memory to share",
    title: "A little moment to remember.",
    image: src,
    alt: `Birthday memory ${index + 1}`,
    className: "picture",
  }));

const slides = [...textSlides, ...pictures];

const confetti = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 37 + 8) % 100}%`,
  delay: `${(index % 9) * -0.43}s`,
  duration: `${5 + (index % 6) * 0.7}s`,
  color: ["#f3a5a4", "#f4c96b", "#9acdbb", "#b8a5d9", "#f5d6c9"][index % 5],
  shape: index % 3 === 0 ? "circle" : "strip",
}));

function App() {
  const [started, setStarted] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);

  React.useEffect(() => {
    if (!started || slideIndex >= slides.length) return undefined;

    const timer = window.setTimeout(() => {
      setSlideIndex((current) => current + 1);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [started, slideIndex]);

  const isFinale = started && slideIndex >= slides.length;
  const slide = slides[slideIndex];

  return (
    <main className={`app ${started ? "is-playing" : "is-intro"}`}>
      {!started ? (
        <button className="start-button" onClick={() => setStarted(true)}>
          Click Me
          <span className="button-sparkle" aria-hidden="true">✦</span>
        </button>
      ) : (
        <section className="surprise" aria-live="polite">
          <div className="confetti" aria-hidden="true">
            {confetti.map((piece, index) => (
              <span
                className={`confetti-piece ${piece.shape}`}
                key={index}
                style={{
                  "--left": piece.left,
                  "--delay": piece.delay,
                  "--duration": piece.duration,
                  "--color": piece.color,
                }}
              />
            ))}
          </div>

          {isFinale ? (
            <div className="finale scene" key="finale">
              <div className="finale-art" aria-hidden="true">
                <span>🎈</span>
                <span>🎂</span>
                <span>🎈</span>
              </div>
              {/* <p className="eyebrow">Today is your day</p> */}
              <h1>Happiest Birthday,<br />Bossing Nurse Kyla!</h1>
              <p className="final-message">Wishing you a day as wonderful as you are. 💛</p>
              <p className="final-note">Thank you for being such an incredible person and my inspiration!</p>
              <p className="final-note">With love,</p>
              <p className="final-note">- Ylden ~</p>
              <div className="final-stars" aria-hidden="true">✦　✧　✦</div>
            </div>
          ) : (
            <div className={`slide scene ${slide.className}`} key={slideIndex}>
              {slide.image ? (
                <div className="picture-frame">
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ) : (
                <div className="slide-art" aria-hidden="true">
                  {slide.art === "lily" ? (
                    <svg className="lily-illustration" viewBox="0 0 160 160">
                      <defs>
                        <g id="stargazer-tepal">
                          <path className="lily-petal" d="M80 88C70 75 48 53 48 32c0-17 8-24 15-12 8 13 12 23 17 34 5-11 9-21 17-34 7-12 15-5 15 12 0 21-22 43-32 56Z" />
                          <path className="lily-petal-stripe" d="M80 84C75 68 61 47 62 28c6 9 13 22 18 34 5-12 12-25 18-34 1 19-13 40-18 56Z" />
                          <path className="lily-vein" d="M80 82 66 27m14 55 28-43" />
                          <g className="lily-freckles">
                            <circle cx="70" cy="66" r="1.5" /><circle cx="75" cy="70" r="1.3" />
                            <circle cx="80" cy="65" r="1.5" /><circle cx="86" cy="69" r="1.3" />
                            <circle cx="91" cy="62" r="1.4" /><circle cx="67" cy="61" r="1.2" />
                            <circle cx="84" cy="74" r="1.2" /><circle cx="96" cy="67" r="1.1" />
                            <circle cx="73" cy="59" r="1.1" /><circle cx="88" cy="57" r="1.2" />
                          </g>
                        </g>
                      </defs>
                      <path className="lily-stem" d="M80 82c-1 24 2 43 0 66" />
                      <path className="lily-leaf" d="M80 125c-22-19-34-17-44-13 12 19 27 23 44 13Z" />
                      <path className="lily-leaf" d="M81 139c17-17 30-18 42-14-10 18-24 23-42 14Z" />
                      <g className="lily-bloom">
                        <use href="#stargazer-tepal" transform="rotate(0 80 88)" />
                        <use href="#stargazer-tepal" transform="rotate(60 80 88)" />
                        <use href="#stargazer-tepal" transform="rotate(120 80 88)" />
                        <use href="#stargazer-tepal" transform="rotate(180 80 88)" />
                        <use href="#stargazer-tepal" transform="rotate(240 80 88)" />
                        <use href="#stargazer-tepal" transform="rotate(300 80 88)" />
                        <path className="lily-throat" d="M73 80Q80 74 87 80L84 88Q80 91 76 88Z" />
                        <path className="lily-stamen" d="M78 83 63 68M80 82 76 61M82 83 92 65M83 85 101 76M77 85 61 79" />
                        <ellipse className="lily-anther" cx="62" cy="67" rx="2" ry="4" transform="rotate(-42 62 67)" />
                        <ellipse className="lily-anther" cx="75" cy="60" rx="2" ry="4" transform="rotate(-12 75 60)" />
                        <ellipse className="lily-anther" cx="93" cy="64" rx="2" ry="4" transform="rotate(30 93 64)" />
                        <ellipse className="lily-anther" cx="102" cy="75" rx="2" ry="4" transform="rotate(62 102 75)" />
                        <ellipse className="lily-anther" cx="60" cy="78" rx="2" ry="4" transform="rotate(-70 60 78)" />
                      </g>
                    </svg>
                  ) : slide.art}
                </div>
              )}
              <p className="eyebrow">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p className="slide-message">{slide.message}</p>
              <div className="progress" aria-label={`Surprise ${slideIndex + 1} of ${slides.length + 1}`}>
                {Array.from({ length: slides.length + 1 }, (_, index) => (
                  <span className={index <= slideIndex ? "active" : ""} key={index} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
