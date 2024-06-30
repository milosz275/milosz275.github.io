import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  timeInterval: PropTypes.array.isRequired,
  docsUrl: PropTypes.string.isRequired,
  stack: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
};

const handleClick = (link) => () => {
  if (document.hasFocus()) {
    window.open(link, "_blank");
  }
}

function PortfolioItem({title, description, timeInterval, docsUrl, imgUrl, stack, link}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutId = useRef(null);

  const handleMouseEnter = () => {
    if (isPaused) {
      return;
    }
    if (window.innerWidth > 768) {
      setIsLoading(true);
      timeoutId.current = setTimeout(() => {
        handleClick(link)();
        setIsLoading(false);
      }, 5000);
    }
  };

  const handleMouseLeave = () => {
    if (isPaused) {
      return;
    }
    if (window.innerWidth > 768) {
      setIsLoading(false);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    }
  };

  const handlePausePlayClick = () => {
    setIsPaused(!isPaused);
    setIsLoading(isPaused);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const play = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="#ffffff"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
  
  const pause = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="#ffffff"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border-2 border-stone-900 dark:border-white rounded-md overflow-hidden md:hover:bg-slate-200 \
      md:dark:hover:bg-github lg:hover:bg-slate-200 lg:dark:hover:bg-github cursor-pointer md:transition md:duration-300 \
      md:ease-in-out md:hover:scale-105 md:dark:hover:scale-105 lg:transition lg:duration-300 \
      lg:ease-in-out lg:hover:scale-105 lg:dark:hover:scale-105">
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
              className="w-full h-48 mb-4 object-cover object-center rounded-md border border-2 border-stone-900 dark:border-white"
            />
            <div className="flex flex-row items-center justify-between pb-3">
              <p onClick={handleClick(link)} onMouseDown={handleClick(link)} className="text-xs md:text-xs text-gray-300 select-none p-1 rounded-md bg-github opacity-45 dark:opacity-75">
                {timeInterval[1] ? `${timeInterval[0]} - ${timeInterval[1]}` : timeInterval[0]}
              </p>
              {docsUrl && (
                <p onClick={handleClick(docsUrl)} onMouseDown={handleClick(docsUrl)} className="text-xs md:text-xs text-blue-500 hover:text-blue-700 select-none p-1 rounded-md">
                  Docs
                </p>
              )}
            </div>
            <p onClick={handleClick(link)} onMouseDown={handleClick(link)} className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-xs text-gray-800 dark:text-gray-300 select-none">
              {stack.map(item => (
                <span className="inline-block px-2 py-1 font-semibold border-2 border-stone-900 dark:border-gray-300 rounded-md" key={item}>
                  {item}
                </span>))}
            </p>
          </div>
        </div>
        <div className="relative pb-1 opacity-50">
          <button onClick={handlePausePlayClick} onMouseDown={handlePausePlayClick} className="absolute bottom-4 right-0 pause-play-btn">
            {isPaused ? play : pause}
          </button>
        </div>
        <div className={
          `absolute h-1 p-0 mt-3 bottom-0
          bg-blue-500 ease-linear
          ${isLoading ? "w-full transition-width" : "w-0"}
          ${!isLoading ? "transition-width" : ""}`
          }
          style={{transitionDuration: isLoading ? "5000ms" : "0ms"}}>
        </div>
    </div>
  );
}

export default PortfolioItem;
