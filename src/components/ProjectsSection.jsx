import { ArrowRight, ExternalLink} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "Raw, powerful protest photography documenting the energy, emotion, and humanity behind every movement.",
    image: "./public/front_page1.jpg",
    tags: ["Documentary", "Street", "Photojournalism"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Orbit Analytics Dashboard",
    description:
      "Warm, authentic family sessions that preserve your most cherished memories forever.",
    image: "./public/front_page2.jpg",  
    tags: ["Portraits", "Natural Light", "Family"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Steel & Motion",
    description:
      "Dynamic automotive photography that captures the power, elegance, and character of every vehicle.",
    image: "./public/frontpage3.jpg",
    tags: ["Automotive", "Commercial", "Detail Shots"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Past <span className="text-primary"> Work </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Each shot was carefully crafted with attention to detail, 
          capturing the moments and stories that deserve to be remembered forever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/machadop1407"
          >
            Check My Insta <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
