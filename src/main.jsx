import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const textSlides = [
  {
    eyebrow: "A little note for you",
    title: "Today is all about celebrating you.",
    message: "Here's to the kindness, care, and joy you bring everywhere.",
    art: "🌷",
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
    message: "Keep being wonderfully, unmistakably you.",
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
    eyebrow: "A favorite memory",
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
              <p className="eyebrow">Today is your day</p>
              <h1>Happiest Birthday,<br />Bossing Nurse Kyla!</h1>
              <p className="final-message">Wishing you a day as wonderful as you are. 💛</p>
              <div className="final-stars" aria-hidden="true">✦　✧　✦</div>
            </div>
          ) : (
            <div className={`slide scene ${slide.className}`} key={slideIndex}>
              {slide.image ? (
                <div className="picture-frame">
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ) : (
                <div className="slide-art" aria-hidden="true">{slide.art}</div>
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
