import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <div
style={{
  position: "fixed",
  top: "clamp(8px, 2vw, 16px)",
  left: "clamp(8px, 2vw, 16px)",
  width: "clamp(70px, 10vw, 120px)",
  zIndex: 50,
    padding: "8px 8px 28px 8px",  /* thick bottom for that polaroid feel */
    background: "#fffff",  /* light cream color for that vintage vibe */
    borderRadius: "8px",
    boxShadow: `
      0 1px 0 #c8bfaa,
      0 2px 0 #b8af9a,
      2px 4px 8px rgba(0,0,0,0.25),
      4px 8px 20px rgba(0,0,0,0.15)
    `,
    transform: "rotate(-2deg)",   /* slight tilt for that worn photo look */
    filter: "sepia(0.08)",
  }}
>
  <img
    src="src/assets/matts_logo.webp"
    alt="Ruizarte Legacy Photography"
    style={{
      display: "block",
      width: "110px",
      filter: "sepia(0.05) contrast(0.95)",
    }}
  />
  {/* Faint bottom label area like an old photo stamp */}
  <div style={{
    textAlign: "center",
    marginTop: "5px",
    fontSize: "7px",
    letterSpacing: "0.15em",
    color: "#000000",
    fontFamily: "Georgia, serif",
    opacity: 0.7,
  }}>
    ✦ MEMORIES ✦
  </div>
</div>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdroup-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
