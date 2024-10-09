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
      name: "Secure Chat",
      link: "https://github.com/milosz275/secure-chat"
    },
    {
      name: "Blog App",
      link: "https://github.com/milosz275/blog-app"
    },
  ];

  return (
    <div className={`flex flex-col items-center justify-center text-center pt-20 pb-12 transition-all duration-300 ${hasScrolled ? "min-h-0" : "min-h-screen"}`}>
      <h1 className="text-4xl md:text-5xl dark:text-white mb-1 md:mb-3 font-bold select-none">
        Miłosz Maculewicz
      </h1>
      <p className="text-base dark:text-white max-w-xl mb-6 font-normal">
        Hi, I'm Miłosz, a software engineer based in Poland.
      </p>
      <p className="text-sm dark:text-white max-w-xl mb-6 font-normal">
        I'm a fourth-year Computer Science student, constantly striving to develop my skills and forge my own path in the tech world. Currently, I'm working on a <a href={featuredProjects[0].link} target="_blank" rel="noreferrer noopener" className="text-cyan-600 hover:underline underline-offset-2 decoration-1 decoration-purple-400">{featuredProjects[0].name}</a> project, always seeking new challenges and opportunities to grow.
      </p>
      <div className={`opacity-0 ${hasScrolled ? "opacity-100 translate-y-0" : "translate-y-10"} transition-opacity duration-700 ease-out`}>
        {/* <div className="flex flex-row space-x-2">
          <a href="https://wakatime.com/@54a5e85a-a806-4d39-bc8b-38523f717b15" target="_blank" rel="noreferrer noopener">
            <img src="https://wakatime.com/badge/user/54a5e85a-a806-4d39-bc8b-38523f717b15.svg" alt="Total time coded since May 27 2024" className="hue-rotate" />
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default Intro;
