import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioItem from "./PortfolioItem";
import portfolio from "../data/portfolio";
import Title from "./Title";
import { REPOS_URL } from "../urls";

function Portfolio() {
  const navigate = useNavigate();
  const [filterStack, setFilterStack] = useState('');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const filteredPortfolio = portfolio.filter(project =>
    filterStack === '' || project.stack.includes(filterStack)
  );

  const uniqueStacks = [...new Set(portfolio.flatMap(project => project.stack))].sort();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center my-20">
        <div className="w-full md:w-9/12 p-12 transition-colors duration-300">
          <Title id="0">
            Projects
          </Title>
          <p className="text-md mb-4">
            Welcome to Portfolio, where each endeavor is crafted with meticulous attention and care. With each new project, I strive not only to innovate but also to document the journey, capturing the essence of every creation. Explore how each endeavor showcases my dedication to precision and creativity. Feel free to filter them by stack.
          </p>
          <p className="text-md">
            Explore my projects by GitHub repo using{" "}
            <span
              onClick={() => navigate(REPOS_URL)}
              className="cursor-pointer text-cyan-600 hover:underline underline-offset-2 decoration-1 decoration-purple-400"
            >
              repos subpage
            </span>.
          </p>
        </div>
      </div>
      <div>
        <h1 onClick={toggleFiltersVisibility} className="cursor-pointer text-md mb-2 opacity-60 hover:underline">
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </h1>
        <div
          className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isFiltersVisible ? 'max-h-96' : 'max-h-0'
            }`}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              className={`select-none inline-block px-2 py-1 font-semibold bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github backdrop-blur-lg rounded-lg shadow-lg ${filterStack === '' ? 'bg-gray-100 text-slate-900 dark:hover:bg-gray-300' : ''
                }`}
              onClick={() => setFilterStack('')}
            >
              All
            </button>
            {uniqueStacks.map((stack) => (
              <button
                key={stack}
                className={`select-none inline-block px-2 py-1 font-semibold bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github backdrop-blur-lg rounded-lg shadow-lg ${filterStack === stack ? 'bg-gray-100 text-slate-900 dark:hover:bg-gray-300' : ''
                  }`}
                onClick={() => setFilterStack(stack)}
              >
                {stack}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortfolio.map(project => (
            <PortfolioItem
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
              timeInterval={project.timeInterval}
              docs={project.docs}
              stack={project.stack}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
