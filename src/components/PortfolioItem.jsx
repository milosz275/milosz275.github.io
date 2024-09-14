import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  timeInterval: PropTypes.array.isRequired,
  docs: PropTypes.array.isRequired,
  stack: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
};

const handleClick = (link) => () => {
  if (document.hasFocus()) {
    window.open(link, "_blank");
  }
}

function PortfolioItem({ title, description, timeInterval, docs, imgUrl, stack, link }) {
  const timeoutId = useRef(null);

  useEffect(() => {
    const handleResize = () => { };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <div
      className="bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] backdrop-blur-lg rounded-lg shadow-lg overflow-hidden md:hover:bg-slate-200 \
      md:dark:hover:bg-github lg:hover:bg-slate-200 lg:dark:hover:bg-github cursor-pointer md:transition md:duration-300 \
      md:ease-in-out lg:transition lg:duration-300 \
      lg:ease-in-out hover:backdrop-blur-0 hover:blur-0">
      <div className="w-full h-full p-4 mt-3 cursor-pointer">
        <div className="flex flex-col w-full h-40" onClick={handleClick(link)} onMouseDown={handleClick(link)}>
          <h3 className="h-full text-lg md:text-xl dark:text-white mb-2 md:mb-3 font-semibold select-none">
            {title}
          </h3>
          <p className="text-xs md:text-small pb-3 text-gray-800 dark:text-gray-300 select-text cursor-text">
            {description}
          </p>
        </div>
        <div>
          <img
            onClick={handleClick(link)} onMouseDown={handleClick(link)}
            src={imgUrl}
            alt={title}
            className="w-full h-48 mb-4 object-cover object-center bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] backdrop-blur-lg rounded-lg shadow-lg"
          />
          <div className="flex flex-row items-center justify-between pb-3">
            <p onClick={handleClick(link)} onMouseDown={handleClick(link)} className="text-xs md:text-xs text-gray-300 select-none p-1 rounded-md bg-github opacity-45 dark:opacity-75">
              {timeInterval[1] ? `${timeInterval[0]} - ${timeInterval[1]}` : timeInterval[0]}
            </p>
            {docs && docs.length >= 2 && (
              <p onClick={handleClick(docs[1])} onMouseDown={handleClick(docs[1])} className="text-xs md:text-xs text-blue-500 hover:text-blue-700 select-none p-1 rounded-md">
                {docs[0]}
              </p>
            )}
          </div>
          <p onClick={handleClick(link)} onMouseDown={handleClick(link)} className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-xs text-gray-800 dark:text-gray-300 select-none">
            {stack.map(item => (
              <span className="inline-block px-2 py-1 font-semibold bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] backdrop-blur-lg rounded-lg shadow-lg" key={item}>
                {item}
              </span>))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem;
