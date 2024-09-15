import React, { useState } from "react";
import PortfolioItem from "./PortfolioItem";
import portfolio from "../data/portfolio";
import Title from "./Title";

function Portfolio() {
  const [filterStack, setFilterStack] = useState('');

  const filteredPortfolio = portfolio.filter(project =>
    filterStack === '' || project.stack.includes(filterStack)
  );

  const uniqueStacks = [...new Set(portfolio.flatMap(project => project.stack))].sort();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center my-20">
        <div className="w-full md:w-9/12 p-12">
          <Title id="0">
            Projects
          </Title>
          Welcome to Portfolio, where each endeavor is crafted with meticulous attention and care. With each new project, I strive not only to innovate but also to document the journey, capturing the essence of every creation. Explore how each endeavor showcases my dedication to precision and creativity. Feel free to filter them by stack.
          <br />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`select-none inline-block px-2 py-1 font-semibold bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300 backdrop-blur-lg rounded-lg shadow-lg ${filterStack === '' ? 'bg-gray-100 text-slate-900 dark:hover:bg-gray-300' : ''}`}
          onClick={() => setFilterStack('')}
        >
          All
        </button>
        {uniqueStacks.map(stack => (
          <button
            key={stack}
            className={`select-none inline-block px-2 py-1 font-semibold bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300 backdrop-blur-lg rounded-lg shadow-lg ${filterStack === stack ? 'bg-gray-100 text-slate-900 dark:hover:bg-gray-300' : ''}`}
            onClick={() => setFilterStack(stack)}
          >
            {stack}
          </button>
        ))}
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
