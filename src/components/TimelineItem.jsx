import React from "react";
import PropTypes from "prop-types";

TimelineItem.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.array.isRequired,
  details: PropTypes.string.isRequired,
};

function TimelineItem({year, title, duration, details}) {
  const lines = details.split("\n").filter((line, index, arr) => line || index < arr.length - 1);

  return (
    <ol className="flex flex-col md:flex-row relative border-l border-stone-500 dark:border-stone-700">
      <li className="mb-10 ml-4">
        <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-stone-500 bg-stone-500 dark:border-stone-700 dark:bg-stone-700" />
        <p className="flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm">
          <span className="inline-block px-2 py-1 font-semibold text-white bg-stone-900 rounded-md select-none dark:text-stone-900 dark:bg-white">
            {year}
          </span>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white select-none">
            {title}
          </h3>
          <div className="my-1 text-sm font-normal leading-one text-stone-500 select-none dark:text-stone-500">
            {duration}
          </div>
          {lines.map((line, index) => (
            <p key={index} className="my-2 text-base font-normal text-stone-700 dark:text-stone-400">
              {line}
            </p>
          ))}
        </p>
      </li>
    </ol>
  );
}

export default TimelineItem;
