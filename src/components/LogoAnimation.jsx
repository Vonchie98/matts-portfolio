import { useEffect, useRef } from "react";

function loadGSAP() {
  return new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => resolve(window.gsap);
    document.head.appendChild(script);
  });
}

const rand = (min, max) => Math.random() * (max - min) + min;

export const LogoReveal = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

useEffect(() => {
  loadGSAP().then((gsap) => runSequence(gsap));
}, []);

useEffect(() => {
  const handleResize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  // Lock scroll when animation starts
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = "0";
  document.body.style.width = "100%";

  

  return () => {
    // Unlock scroll when LogoReveal unmounts
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
  };
}, []);

  const runSequence = (gsap) => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const p0 = { x: cx + 340, y: cy - 240 };
    const p1 = { x: cx + 100, y: cy - 200 };
    const p2 = { x: cx - 40,  y: cy - 40  };
    const p3 = { x: cx - 10,  y: cy - 20  };

    const getBezier = (t) => {
      const mt = 1 - t;
      return {
        x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
        y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y,
      };
    };

    const trailPoints = [];
    const starTrail = { t: 0 };

    const drawTrail = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pos = getBezier(t);
      trailPoints.push({ ...pos });
      if (trailPoints.length > 80) trailPoints.splice(0, trailPoints.length - 80);

      for (let i = 1; i < trailPoints.length; i++) {
        const age = i / trailPoints.length;
        const prev = trailPoints[i - 1];
        const curr = trailPoints[i];

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = `hsla(215, 90%, 65%, ${age * 0.25})`;
        ctx.lineWidth = 10 * age;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = `hsla(210, 95%, 80%, ${age * 0.6})`;
        ctx.lineWidth = 4 * age;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = `hsla(210, 100%, 95%, ${age * 0.95})`;
        ctx.lineWidth = 1.5 * age;
        ctx.stroke();
      }

      const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 28);
      halo.addColorStop(0, "hsla(210, 95%, 90%, 0.6)");
      halo.addColorStop(0.4, "hsla(215, 90%, 65%, 0.3)");
      halo.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      const orb = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 8);
      orb.addColorStop(0, "white");
      orb.addColorStop(0.5, "hsl(210, 95%, 85%)");
      orb.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = orb;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    const masterTl = gsap.timeline();
    masterTl.to(starTrail, {
      t: 1,
      duration: 1.5,
      ease: "power2.in",
      onUpdate: () => drawTrail(starTrail.t),
      onComplete: () => triggerFlash(gsap, ctx, canvas, cx, cy),
    });
  };

  const triggerFlash = (gsap, ctx, canvas, cx, cy) => {
    const flashEl = containerRef.current.querySelector(".flash-overlay");
    const logoEl = containerRef.current.querySelector(".logo-wrap");
    const tl = gsap.timeline();

    tl.to(flashEl, { opacity: 1, scale: 1, duration: 0.07, ease: "power4.out" });
    tl.add(() => drawStarFlare(gsap, ctx, canvas, cx, cy), 0.04);
    tl.to(flashEl, { opacity: 0, scale: 3, duration: 0.6, ease: "power3.out" }, 0.07);
    tl.to(canvas, { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.1);
    tl.add(() => revealLogo(gsap, logoEl), 0.18);
  };

  const drawStarFlare = (gsap, ctx, canvas, cx, cy) => {
    const flare = { p: 0 };
    gsap.to(flare, {
      p: 1,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        const fade = 1 - flare.p;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const hLen = 200 * flare.p;
        const vLen = 260 * flare.p;

        const hg = ctx.createLinearGradient(cx - hLen, cy, cx + hLen, cy);
        hg.addColorStop(0, "transparent");
        hg.addColorStop(0.45, `hsla(210, 90%, 75%, ${fade * 0.5})`);
        hg.addColorStop(0.5, `hsla(210, 95%, 95%, ${fade})`);
        hg.addColorStop(0.55, `hsla(210, 90%, 75%, ${fade * 0.5})`);
        hg.addColorStop(1, "transparent");
        ctx.fillStyle = hg;
        ctx.fillRect(cx - hLen, cy - 4, hLen * 2, 8);

        const vg = ctx.createLinearGradient(cx, cy - vLen, cx, cy + vLen);
        vg.addColorStop(0, "transparent");
        vg.addColorStop(0.38, `hsla(210, 90%, 75%, ${fade * 0.45})`);
        vg.addColorStop(0.5, `hsla(210, 95%, 95%, ${fade})`);
        vg.addColorStop(0.62, `hsla(210, 90%, 75%, ${fade * 0.45})`);
        vg.addColorStop(1, "transparent");
        ctx.fillStyle = vg;
        ctx.fillRect(cx - 4, cy - vLen, 8, vLen * 2);

        const orbR = 70 * (1 - flare.p * 0.6);
        const og = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR);
        og.addColorStop(0, `hsla(210, 100%, 98%, ${fade})`);
        og.addColorStop(0.3, `hsla(215, 90%, 75%, ${fade * 0.7})`);
        og.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
        ctx.fillStyle = og;
        ctx.fill();
      },
    });
  };

  const revealLogo = (gsap, logoEl) => {
    logoEl.style.opacity = 1;
    const tl = gsap.timeline({ onComplete: () => onComplete?.() });

    tl.fromTo(".logo-star",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)" },
    0);

    tl.fromTo(".logo-swoosh",
      { strokeDashoffset: 900, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.1, ease: "power2.inOut" },
    0.1);

    tl.fromTo(".logo-orbit",
      { strokeDashoffset: 720, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 0.85, ease: "power2.out" },
    0.4);

    tl.fromTo(".char-ruizarte",
      { y: -18, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.038, ease: "power3.out" },
    0.55);

    tl.fromTo(".char-legacy",
      { y: 18, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.038, ease: "power3.out" },
    0.7);

    tl.fromTo(".logo-photography",
      { opacity: 0, letterSpacing: "0.6em", y: 8 },
      { opacity: 1, letterSpacing: "0.18em", y: 0, duration: 0.55, ease: "power2.out" },
    0.95);

    tl.to(".logo-wrap", {
      filter: "drop-shadow(0 0 20px hsl(215,90%,60%)) drop-shadow(0 0 50px hsl(220,80%,45%))",
      duration: 0.4,
    }, 1.2);
    tl.to(".logo-wrap", {
      filter: "drop-shadow(0 0 6px hsl(215,85%,50%))",
      duration: 1,
      ease: "power2.inOut",
    }, 1.6);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#e8e4dc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 30,
        }}
      />

      <div
        className="flash-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, white 0%, hsl(215,90%,88%) 25%, transparent 65%)",
          opacity: 0,
          transform: "scale(0.2)",
          pointerEvents: "none",
          zIndex: 31,
        }}
      />

      {/*
        Logo wrapper — relative positioning anchor.
        The SVG is absolute inside here covering the whole block.
        Text sits on top at z-index 2.
        PHOTOGRAPHY is absolutely positioned bottom-right of this wrapper.
      */}
      <div
        className="logo-wrap"
        style={{
          position: "relative",
          opacity: 0,
          zIndex: 30,
          width: "min(420px, 90vw)",
          height: "min(260px, 56vw)",
          filter: "drop-shadow(0 0 6px hsl(215,85%,50%))",
        }}
      >
        {/* SVG — covers full logo-wrap area, zIndex 1 (behind text) */}
        <svg
          viewBox="0 0 420 260"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            zIndex: 31,
            pointerEvents: "none",
          }}
        >
          {/* 4-point star — top center above RUIZARTE */}
          <g className="logo-star" style={{ transformOrigin: "170px 20px" }}>
  <polygon
    points="170,-18 175,6 204,10 175,14 170,40 165,14 136,10 165,6"
    fill="hsl(228, 72%, 28%)"
  />
</g>
         {/*
  Thin orbit ellipse — shifted left
  cx moved from 235 → 190 to push it left
*/}
<ellipse
  className="logo-orbit"
  cx="190" cy="148"
  rx="165" ry="55"
  fill="none"
  stroke="hsl(222, 60%, 42%)"
  strokeWidth="2"
  transform="rotate(-10, 190, 148)"
  style={{
    strokeDasharray: 720,
    strokeDashoffset: 720,
  }}
/>

{/*
  Thick C-swoosh:
  Start: M 20 238 — bottom-right where the P of PHOTOGRAPHY sits
  End: exactly at the star polygon tip 170, 4
*/}

{/* Main swoosh — full thickness, no linecap so ends are flat */}
<defs>
  <filter id="taper" x="-20%" y="-20%" width="140%" height="140%">
    <feMorphology operator="erode" radius="0" result="base"/>
  </filter>
  <marker id="tipStart" markerWidth="2" markerHeight="2" refX="1" refY="1" orient="auto">
    <circle cx="1" cy="1" r="1" fill="hsl(226, 68%, 28%)" />
  </marker>
</defs>

{/* Single continuous path — shifted left, one smooth curve */}
<path
  className="logo-swoosh"
  d="M 240 225 C 241 238 88 256 22 218 C -24 186 -27 134 -9 98 C 11 60 58 26 136 18"
  fill="none"
  stroke="hsl(226, 68%, 28%)"
  strokeWidth="18"
  strokeLinecap="round"
  style={{
    strokeDasharray: 900,
    strokeDashoffset: 900,
  }}
/>
        </svg>

        {/* RUIZARTE + LEGACY — positioned upper-left inside the swoosh */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            left: "52px",
            zIndex: 31,
          }}
        >
          {/* RUIZARTE */}
          <div style={{ display: "flex" }}>
            {"RUIZARTE".split("").map((ch, i) => (
              <span
                key={i}
                className="char-ruizarte"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(26px, 4.5vw, 38px)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  color: "hsl(228, 70%, 26%)",
                  textShadow: "1px 1px 0 hsl(228,50%,70%), 0 0 10px hsl(215,80%,55%)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  fontFamily: "'Georgia', serif",
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* LEGACY — slightly larger */}
          <div style={{ display: "flex", marginTop: "2px" }}>
            {"LEGACY".split("").map((ch, i) => (
              <span
                key={i}
                className="char-legacy"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(30px, 5.2vw, 44px)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  color: "hsl(228, 70%, 26%)",
                  textShadow: "1px 1px 0 hsl(228,50%,70%), 0 0 10px hsl(215,80%,55%)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  fontFamily: "'Georgia', serif",
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* PHOTOGRAPHY — absolute bottom-right corner, no dots */}
        <div
  className="logo-photography"
  style={{
    position: "absolute",
    bottom: "12px",
    right: "8px",
    zIndex: 31,
    fontSize: "clamp(11px, 1.5vw, 15px)",  // ← was clamp(8px, 1.1vw, 11px)
    fontWeight: 700,
    color: "hsl(228, 62%, 30%)",
    letterSpacing: "0.18em",
    fontFamily: "'Georgia', serif",
    whiteSpace: "nowrap",
  }}
>
  PHOTOGRAPHY
</div>
      </div>
    </div>
  );
};