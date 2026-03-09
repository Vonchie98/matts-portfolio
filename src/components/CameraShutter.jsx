import { useEffect, useState } from "react";

export const CameraShutter = ({ onComplete }) => {
  const [shutterPressed, setShutterPressed] = useState(false);
  const [phase, setPhase] = useState("waiting"); // "waiting" → "flash"

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  const handleShutter = () => {
    if (shutterPressed) return;
    setShutterPressed(true);
    setPhase("flash");
    setTimeout(() => onComplete(), 800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        background: "#e8e4dc", // matches LogoReveal background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >

      {/* Logo stays visible — just the same background as LogoReveal so it feels continuous */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* Re-render the static finished logo so it looks like the animation just held */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          filter: "drop-shadow(0 0 6px hsl(215,85%,50%))",
          position: "relative",
          width: "min(420px, 90vw)",
          height: "min(260px, 56vw)",
        }}>
          <svg
            viewBox="0 0 420 260"
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {/* Star */}
            <polygon
              points="170,-18 175,6 204,10 175,14 170,40 165,14 136,10 165,6"
              fill="hsl(228, 72%, 28%)"
            />

            {/* Swoosh */}
            <path
              d="M 240 225 C 241 238 88 256 22 218 C -24 186 -27 134 -9 98 C 11 60 58 26 132 20"
              fill="none"
              stroke="hsl(226, 68%, 28%)"
              strokeWidth="18"
              strokeLinecap="butt"
            />

            {/* Orbit ellipse */}
            <ellipse
              cx="190" cy="148"
              rx="165" ry="55"
              fill="none"
              stroke="hsl(222, 60%, 42%)"
              strokeWidth="1.8"
              transform="rotate(-10, 190, 148)"
            />
          </svg>

          {/* Text */}
          <div style={{ position: "absolute", top: "72px", left: "52px", zIndex: 2 }}>
            <div style={{ display: "flex" }}>
              {"RUIZARTE".split("").map((ch, i) => (
                <span key={i} style={{
                  display: "inline-block",
                  fontSize: "clamp(26px, 4.5vw, 38px)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  color: "hsl(228, 70%, 26%)",
                  textShadow: "1px 1px 0 hsl(228,50%,70%), 0 0 10px hsl(215,80%,55%)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  fontFamily: "'Georgia', serif",
                }}>{ch}</span>
              ))}
            </div>
            <div style={{ display: "flex", marginTop: "2px" }}>
              {"LEGACY".split("").map((ch, i) => (
                <span key={i} style={{
                  display: "inline-block",
                  fontSize: "clamp(30px, 5.2vw, 44px)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  color: "hsl(228, 70%, 26%)",
                  textShadow: "1px 1px 0 hsl(228,50%,70%), 0 0 10px hsl(215,80%,55%)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  fontFamily: "'Georgia', serif",
                }}>{ch}</span>
              ))}
            </div>
          </div>

          {/* Photography */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            right: "8px",
            zIndex: 2,
            fontSize: "clamp(11px, 1.5vw, 15px)",
            fontWeight: 700,
            color: "hsl(228, 62%, 30%)",
            letterSpacing: "0.18em",
            fontFamily: "'Georgia', serif",
            whiteSpace: "nowrap",
          }}>
            PHOTOGRAPHY
          </div>
        </div>
      </div>

      {/* Tiny camera — bottom center, slides up after a short delay */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "cameraSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
        }}
      >
        {/* Prompt */}
        <p style={{
          color: "hsl(228, 60%, 30%)",
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(11px, 1.5vw, 14px)",
          letterSpacing: "0.12em",
          marginBottom: "10px",
          animation: "fadeInText 0.5s ease 1s both",
          opacity: 0,
          whiteSpace: "nowrap",
        }}>
          — press to continue —
        </p>

        {/* Tiny camera */}
        <div style={{ position: "relative", width: "clamp(80px, 12vw, 110px)" }}>
          <svg
            viewBox="0 0 260 180"
            style={{
              width: "100%",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
            }}
          >
            <rect x="10" y="55" width="240" height="115" rx="12" fill="#1a1a2e" />
            <rect x="10" y="55" width="240" height="115" rx="12" fill="none" stroke="#2d2d4e" strokeWidth="2" />
            <rect x="80" y="30" width="100" height="32" rx="8" fill="#1a1a2e" />
            <rect x="80" y="30" width="100" height="32" rx="8" fill="none" stroke="#2d2d4e" strokeWidth="2" />
            <circle cx="105" cy="30" r="10" fill="#cc3333" />
            <circle cx="105" cy="30" r="7" fill={shutterPressed ? "#ff9999" : "#ee4444"} />
            <circle cx="105" cy="30" r="3" fill="white" opacity="0.4" />
            <circle cx="140" cy="118" r="48" fill="#0d0d1a" />
            <circle cx="140" cy="118" r="48" fill="none" stroke="#2d2d4e" strokeWidth="3" />
            <circle cx="140" cy="118" r="40" fill="none" stroke="#333355" strokeWidth="2" />
            <circle cx="140" cy="118" r="32" fill="#050510" />
            <circle cx="140" cy="118" r="32" fill="none" stroke="#444466" strokeWidth="1.5" />
            <circle cx="140" cy="118" r="28" fill="#060618" />
            <ellipse cx="128" cy="106" rx="8" ry="5" fill="white" opacity="0.08" transform="rotate(-30 128 106)" />
            <ellipse cx="132" cy="104" rx="3" ry="2" fill="white" opacity="0.15" transform="rotate(-30 132 104)" />
            <rect x="188" y="65" width="40" height="28" rx="4" fill="#0d0d1a" />
            <rect x="190" y="67" width="36" height="24" rx="3" fill="#111133" />
            <rect x="22" y="65" width="28" height="18" rx="4" fill="#222244" />
            <rect x="24" y="67" width="24" height="14" rx="2" fill="#cccc88" opacity="0.3" />
            <circle cx="218" cy="42" r="14" fill="#222244" />
            <circle cx="218" cy="42" r="10" fill="#1a1a3a" />
            <line x1="218" y1="32" x2="218" y2="36" stroke="white" strokeWidth="1.5" opacity="0.6" />
            {[0,1,2,3,4].map(i => (
              <rect key={i} x="14" y={70 + i * 14} width="18" height="8" rx="2" fill="#222" opacity="0.6" />
            ))}
          </svg>

          {/* Clickable shutter */}
          <div
            onClick={handleShutter}
            style={{
              position: "absolute",
              top: "13%",
              left: "36%",
              width: "clamp(18px, 4vw, 26px)",
              height: "clamp(18px, 4vw, 26px)",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 6,
              animation: shutterPressed ? "none" : "pulse 1.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* White flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          zIndex: 20,
          opacity: phase === "flash" ? 1 : 0,
          transition: phase === "flash" ? "opacity 0.07s ease-in" : "none",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes cameraSlideUp {
          from { transform: translateX(-50%) translateY(60px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);   opacity: 1; }
        }
        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(238,68,68,0.7); }
          50%       { box-shadow: 0 0 0 10px rgba(238,68,68,0); }
        }
      `}</style>
    </div>
  );
};