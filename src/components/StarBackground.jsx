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

export const StarBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let shootingStarTimers = [];

    loadGSAP().then((gsap) => {
      spawnStaticStars(gsap);
      scheduleShootingStars(gsap, shootingStarTimers);
    });

    return () => {
      shootingStarTimers.forEach(clearTimeout);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  const spawnStaticStars = (gsap) => {
    const container = containerRef.current;
    const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      const size = rand(1, 3);
      // Fixed navy blue palette only
      const lightness = rand(45, 70);

      Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `hsl(220, 85%, ${lightness}%)`,
        boxShadow: `0 0 ${size * 4}px ${size * 1.5}px hsl(220, 85%, ${lightness}%)`,
        left: `${rand(0, 100)}%`,
        top: `${rand(0, 100)}%`,
        opacity: 0,
      });

      container.appendChild(star);

      gsap.to(star, {
        opacity: rand(0.4, 1),
        duration: rand(0.5, 2),
        delay: rand(0, 5),
        ease: "power2.out",
        onComplete: () => {
          gsap.to(star, {
            opacity: rand(0.08, 0.3),
            scale: rand(0.5, 0.85),
            duration: rand(1.5, 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: rand(0, 2),
          });
        },
      });
    }
  };

  const scheduleShootingStars = (gsap, timers) => {
    const fireNext = () => {
      launchShootingStar(gsap);
      const t = setTimeout(fireNext, rand(600, 2800));
      timers.push(t);
    };
    for (let i = 0; i < 3; i++) {
      const t = setTimeout(() => launchShootingStar(gsap), rand(200, 1800));
      timers.push(t);
    }
    const t = setTimeout(fireNext, rand(1500, 3000));
    timers.push(t);
  };

  const launchShootingStar = (gsap) => {
    const container = containerRef.current;
    if (!container) return;

    const angle = rand(30, 40);
    const trailLength = rand(140, 280);
    const thickness = rand(2, 3.5);
    const duration = rand(0.9, 2);
    const rad = (angle * Math.PI) / 180;
    const dist = rand(450, 800);
    const travelX = Math.cos(rad) * dist;
    const travelY = Math.sin(rad) * dist;
    const startX = rand(5, 72);
    const startY = rand(0, 55);

    // --- Wrapper ---
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, {
      position: "absolute",
      left: `${startX}%`,
      top: `${startY}%`,
      transform: `rotate(${angle}deg)`,
      opacity: 0,
      pointerEvents: "none",
    });

    // --- Trail: layered for depth ---
    // Outer soft glow trail (wide, very faint)
    const trailGlow = document.createElement("div");
    Object.assign(trailGlow.style, {
      position: "absolute",
      width: `${trailLength}px`,
      height: `${thickness * 8}px`,
      top: `${-thickness * 3.5}px`,
      borderRadius: "999px",
      background: `linear-gradient(to right,
        transparent 0%,
        hsl(215, 90%, 35%) 40%,
        hsl(210, 95%, 55%) 75%,
        transparent 100%)`,
      filter: `blur(${thickness * 3}px)`,
      transformOrigin: "right center",
      scaleX: 0,
      opacity: 0.5,
    });

    // Core trail (thin, sharp center line)
    const trailCore = document.createElement("div");
    Object.assign(trailCore.style, {
      position: "absolute",
      width: `${trailLength}px`,
      height: `${thickness}px`,
      top: 0,
      borderRadius: "999px",
      // Key: near-transparent at far tail, builds to bright blue, tips to near-white near head
      background: `linear-gradient(to right,
        transparent 0%,
        transparent 10%,
        hsl(220, 80%, 25%) 25%,
        hsl(215, 90%, 50%) 55%,
        hsl(210, 95%, 72%) 80%,
        white 95%,
        white 100%)`,
      transformOrigin: "right center",
      scaleX: 0,
    });

    // --- HEAD: this is where all the magic lives ---
    // Three layered orbs to simulate the real incandescent head

    // Outermost halo — huge, very faint blue
    const halo = document.createElement("div");
    const haloSize = thickness * 22;
    Object.assign(halo.style, {
      position: "absolute",
      right: `${-haloSize / 2}px`,
      top: `${-(haloSize / 2) + thickness / 2}px`,
      width: `${haloSize}px`,
      height: `${haloSize}px`,
      borderRadius: "50%",
      background: `radial-gradient(circle,
        hsl(210, 90%, 65%) 0%,
        hsl(215, 85%, 50%) 20%,
        transparent 70%)`,
      opacity: 0.35,
      filter: `blur(${thickness * 3}px)`,
    });

    // Mid corona — medium, bright blue-white
    const corona = document.createElement("div");
    const coronaSize = thickness * 10;
    Object.assign(corona.style, {
      position: "absolute",
      right: `${-coronaSize / 2}px`,
      top: `${-(coronaSize / 2) + thickness / 2}px`,
      width: `${coronaSize}px`,
      height: `${coronaSize}px`,
      borderRadius: "50%",
      background: `radial-gradient(circle,
        white 0%,
        hsl(210, 95%, 75%) 30%,
        hsl(215, 90%, 55%) 60%,
        transparent 100%)`,
      opacity: 0.8,
      filter: `blur(${thickness * 1.2}px)`,
    });

    // Inner core — tiny, pure white hot center
    const core = document.createElement("div");
    const coreSize = thickness * 3.5;
    Object.assign(core.style, {
      position: "absolute",
      right: `${-coreSize / 2}px`,
      top: `${-(coreSize / 2) + thickness / 2}px`,
      width: `${coreSize}px`,
      height: `${coreSize}px`,
      borderRadius: "50%",
      background: "white",
      boxShadow: `
        0 0 ${thickness * 2}px ${thickness}px white,
        0 0 ${thickness * 5}px ${thickness * 2}px hsl(210, 95%, 85%),
        0 0 ${thickness * 10}px ${thickness * 4}px hsl(215, 90%, 65%)
      `,
    });

    // 4-point lens flare cross — the signature sparkle
    const flare = document.createElement("div");
    const flareSize = thickness * 28;
    Object.assign(flare.style, {
      position: "absolute",
      right: `${-flareSize / 2}px`,
      top: `${-(flareSize / 2) + thickness / 2}px`,
      width: `${flareSize}px`,
      height: `${flareSize}px`,
      borderRadius: "50%",
      // Two perpendicular linear gradients overlaid = cross/star shape
      background: `
        radial-gradient(1px ${flareSize}px at 50% 50%,
          hsl(210, 95%, 80%) 0%, transparent 100%),
        radial-gradient(${flareSize}px 1px at 50% 50%,
          hsl(210, 95%, 80%) 0%, transparent 100%)
      `,
      opacity: 0,
      filter: `blur(0.5px)`,
      transform: `rotate(-${angle}deg)`, // counter-rotate so flare stays upright
    });

    // Assemble
    trailCore.appendChild(halo);
    trailCore.appendChild(corona);
    trailCore.appendChild(core);
    trailCore.appendChild(flare);
    wrapper.appendChild(trailGlow);
    wrapper.appendChild(trailCore);
    container.appendChild(wrapper);

    // --- GSAP Timeline ---
    const tl = gsap.timeline({ onComplete: () => wrapper.remove() });

    // Move the whole wrapper across screen
    tl.to(wrapper, {
      opacity: 1,
      x: travelX,
      y: travelY,
      duration,
      ease: "power1.in",
    }, 0);

    // Trail draws on (right→left, scaleX 0→1, origin: right)
    tl.to([trailCore, trailGlow], {
      scaleX: 1,
      duration: duration * 0.4,
      ease: "power2.out",
    }, 0);

    // Flare spikes burst on as head appears
    tl.to(flare, {
      opacity: rand(0.4, 0.7),
      scale: rand(0.8, 1.2),
      duration: duration * 0.2,
      ease: "power3.out",
    }, 0);

    // Tail dissolves away — scaleX shrinks back from the tail end
    tl.to([trailCore, trailGlow], {
      scaleX: 0,
      duration: duration * 0.5,
      ease: "expo.in", // tail evaporates slowly then snaps
    }, duration * 0.4);

    // Head flares out and fades — corona expands
    tl.to(corona, {
      scale: 2.5,
      opacity: 0,
      duration: duration * 0.35,
      ease: "power2.out",
    }, duration * 0.7);

    tl.to(halo, {
      scale: 1.8,
      opacity: 0,
      duration: duration * 0.3,
      ease: "power1.out",
    }, duration * 0.72);

    tl.to([core, flare], {
      scale: 0,
      opacity: 0,
      duration: duration * 0.25,
      ease: "power3.in",
    }, duration * 0.78);

    // Whole thing out
    tl.to(wrapper, {
      opacity: 0,
      duration: 0.15,
    }, duration * 0.9);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: "transparent",
      }}
    />
  );
};