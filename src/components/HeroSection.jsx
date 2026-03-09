import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { LogoReveal } from "./LogoAnimation";
import { ImageIntro } from "./matts_dad";
import { CameraShutter } from "./CameraShutter";

export const HeroSection = () => {
  const [phase, setPhase] = useState("image"); // "image" → "logo" → "hero"
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
       {phase === "image" && <ImageIntro onComplete={() => setPhase("logo")} />}
    {phase === "logo" && <LogoReveal onComplete={() => setPhase("camera")} />}
    {phase === "camera" && <CameraShutter onComplete={() => setPhase("hero")} />}
    {phase === "hero" && (
        <>
          <div className="container max-w-4xl mx-auto text-center z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
                <span className="text-primary opacity-0 animate-fade-in-delay-1">
                  {" "} Matthew
                </span>
                <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                  {" "}Coronado 
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                 a 15-year-old graphic designer and photographer. 
                 I offer professional event and portrait photography 
                 alongside custom logo design and promotional work. At Ruiz Arte Legacy, 
                 I combine my passion for visual storytelling with a drive to produce top-tier 
                 work for every client.
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground mb-2">Scroll</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </>
      )}
    </section>
  );
};

