import React from "react";
import PropTypes from 'prop-types';
PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  stack: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
};

const handleClick = (link) => () => {
  window.open(link, '_blank');
}

function PortfolioItem({title, description, imgUrl, stack, link}) {
  return (
    <div
      className="border-2 border-stone-900 dark:border-white rounded-md overflow-hidden md:hover:bg-slate-200 \
      md:dark:hover:bg-github lg:hover:bg-slate-200 lg:dark:hover:bg-github cursor-pointer md:transition md:duration-300 \
      md:ease-in-out md:hover:scale-105 md:dark:hover:scale-105 lg:transition lg:duration-300 \
      lg:ease-in-out lg:hover:scale-105 lg:dark:hover:scale-105">
        <div className="w-full p-4 mt-3 cursor-pointer">
          <div className="flex flex-col w-full h-40" onClick={handleClick(link)}>
            <h3 className="h-full text-lg md:text-xl dark:text-white mb-2 md:mb-3 font-semibold select-none">
              {title}
            </h3>
            <p className="text-xs md:text-small pb-3 text-gray-800 dark:text-gray-300 select-text cursor-text">
              {description}
            </p>
          </div>
          <div onClick={handleClick(link)}>
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-48 mb-4 object-cover object-center rounded-md border border-2 border-stone-900 dark:border-white"
            />
            <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-xs text-gray-800 dark:text-gray-300 select-none">
              {stack.map(item => (
                <span className="inline-block px-2 py-1 font-semibold border-2 border-stone-900 dark:border-gray-300 rounded-md" key={item}>
                  {item}
                </span>))}
            </p>
          </div>
        </div>
    </div>
  );
}

export default PortfolioItem;
