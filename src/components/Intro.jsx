import React, { useState, useEffect } from "react";
import "../styles/rainbow.css";

function Intro() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      } else if (window.scrollY === 0 && hasScrolled) {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const featuredProjects = [
    {
      name: "Graph Visualizer",
      link: "https://github.com/milosz275/graph-visualizer"
    },
    {
      name: "Bitlab",
      link: "https://github.com/milosz275/bitlab"
    },
  ];

  return (
    <div className={`flex flex-col items-center justify-center text-center pt-20 pb-12 transition-all duration-300 ${hasScrolled ? "min-h-0" : "min-h-screen"}`}>
      <h1 className="text-4xl md:text-5xl dark:text-white mb-1 md:mb-3 font-bold select-none">
        Miłosz Maculewicz
      </h1>
      <p className="text-base dark:text-white max-w-xl mb-6 font-normal">
        Hi, I'm Miłosz, a Software/DevOps Engineer based in Poland.
      </p>
    </div>
  );
}

export default Intro;
