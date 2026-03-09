import { Camera, Aperture, Image } from "lucide-react";
export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Web Developer & Tech Creator
            </h3>

            <p className="text-muted-foreground">
              With over 2 years of experience behind the lens, I specialize in capturing
  authentic moments, emotions, and stories through carefully composed,
  naturally lit photography that stands the test of time.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about finding beauty in the everyday and transforming
  fleeting moments into timeless images. I'm constantly refining my craft
  and exploring new techniques to deliver photographs that truly move people.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Aperture className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Portrait Photography </h4>
                  <p className="text-muted-foreground">
                    Capturing authentic expressions and personalities through carefully composed, 
  naturally lit portrait sessions.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Professional Photoshoots</h4>
                  <p className="text-muted-foreground">
                   Delivering polished, high-quality images for brands, families, and individuals 
  with a personalized creative vision.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Image className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Photo Editing & Retouching</h4>
                  <p className="text-muted-foreground">
                    Bringing every image to life through professional color grading, retouching, 
  and post-processing from shoot to final delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
