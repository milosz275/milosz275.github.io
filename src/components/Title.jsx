import React from "react";
import PropTypes from "prop-types";

Title.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function Title({ children, id }) {
  return (
    <h1
      id={id && id}
      className="text-2xl font-bold underline underline-offset-8 decoration-4 mb-5 text-stone-900 dark:text-white select-none">
      {children}
    </h1>
  )
}

export default Title;
