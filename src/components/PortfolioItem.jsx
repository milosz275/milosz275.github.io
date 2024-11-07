import React, { useEffect, useRef, useState } from "react";
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
  const [src, setSrc] = useState(imgUrl);
  const [isFallback, setIsFallback] = useState(false);
  const fallbackImgUrl = "assets/undraw_programming_re_kg9v.svg";

  const handleError = () => {
    setSrc(fallbackImgUrl);
    setIsFallback(true);
  };

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
      className="bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] backdrop-blur-lg rounded-lg shadow-lg overflow-hidden sm:hover:bg-slate-200 \
      sm:dark:hover:bg-github cursor-pointer sm:transition sm:duration-300 sm:ease-in-out sm:hover:backdrop-blur-0 sm:hover:blur-0">
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
            onClick={handleClick(link)}
            onMouseDown={handleClick(link)}
            src={src}
            alt={title}
            onError={handleError}
            className={`w-full h-48 mb-4 object-cover object-center bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] rounded-lg shadow-lg ${isFallback ? 'backdrop-brightness-50' : ''}`}
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
              <span className="inline-block px-2 py-1 font-semibold bg-gradient-to-t transition-all hover:cursor-default duration-200 from-slate-100/[.2] to-slate-200[.1] hover:from-purple-200/[.9] hover:to-purple-700[.9] rounded-lg shadow-lg" key={item}>
                {item}
              </span>))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem;
