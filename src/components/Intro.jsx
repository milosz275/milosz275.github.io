import React from "react";

function Intro() {
  return (
    <div className="flex items-center justify-center flex-col text-center pt-20 pb-12">
        <h1 className="text-4xl md:text-5xl dark:text-white mb-1 md:mb-3 font-bold select-none">
            Miłosz Maculewicz
        </h1>
        <p className="text-base text-slate-900 dark:text-white md:text-xl mb-3 font-light drop-shadow-dark dark:drop-shadow-light select-none">
            Software Developer
        </p>
        <p className="text-sm max-w-xl mb-6 font-normal">
            I&apos;m a third-year Computer Science student with a strong background in programming and system administration.
            I am proficient in multiple programming languages and have a keen interest in studying efficient algorithms.
            Currently, I&apos;m working on a&nbsp;
            <a
              target="_blank"
              href="https://github.com/mldxo/uav-collision-avoidance"
              className="text-cyan-600 hover:underline underline-offset-2 decoration-1 decoration-purple-400 dark:decoration-orange-400"
              rel="noreferrer noopener">
              UAV collision avoidance
            </a>
            &nbsp;simulation problem for my bachelor&apos;s thesis.
        </p>
    </div>
  );
}

export default Intro;
