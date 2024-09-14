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
        <div className="w-full md:w-7/12">
          <Title>
            Projects
          </Title>
          Welcome to Portfolio, where each endeavor is crafted with meticulous attention and care. With each new project, I strive not only to innovate but also to document the journey, capturing the essence of every creation. Explore how each endeavor showcases my dedication to precision and creativity. Feel free to filter them by stack.
          <br />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`inline-block px-2 py-1 font-semibold border-2 border-stone-900 dark:border-gray-300 rounded-md ${filterStack === '' ? 'bg-gray-100 text-slate-900' : ''}`}
          onClick={() => setFilterStack('')}
        >
          All
        </button>
        {uniqueStacks.map(stack => (
          <button
            key={stack}
            className={`inline-block px-2 py-1 font-semibold border-2 border-stone-900 dark:border-gray-300 rounded-md ${filterStack === stack ? 'bg-gray-100 text-slate-900' : ''}`}
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
