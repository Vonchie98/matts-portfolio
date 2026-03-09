import { useEffect, useState } from "react";

export const ImageIntro = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "Everything I have today, and everything this company stands for, I owe to my father, Carlos Coronado (1973–2021)."; // ← your tagline here

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    // Type out the text character by character
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        // Hold for 1.5s after typing finishes then move to logo
        setTimeout(() => {
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";
          onComplete();
        }, 8000);
      }
    }, 85); // ← ms per character, lower = faster typing

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Full screen background image */}
      <img
        src="src/assets/matts_dad.jpg"  // ← drop your image in /public
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark overlay so text is readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />

      {/* Typed text at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(30px, 6vh, 60px)",
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 24px",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: "clamp(18px, 3vw, 28px)",
            color: "white",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            letterSpacing: "0.05em",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            minHeight: "1.5em",
          }}
        >
          {text}
          {/* Blinking cursor while typing */}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "white",
              marginLeft: "3px",
              verticalAlign: "middle",
              animation: "blink 0.7s step-end infinite",
            }}
          />
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};