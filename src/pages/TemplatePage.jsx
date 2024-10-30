import React from "react";
import PropTypes from "prop-types";
import useCheckDarkMode from "../handlers/useCheckDarkMode";
import { sun, moon } from "../icons";
import "react-notifications-component/dist/theme.css"

TemplatePage.propTypes = {
	children: PropTypes.node.isRequired
};

function TemplatePage({ children }) {
	const { theme, toggleTheme } = useCheckDarkMode();

	return (
		<>
			<button
				type="button"
				onClick={toggleTheme}
				className="fixed p-2 z-10 right-5 top-4 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300 text-lg rounded-md hover:scale-105">
				<div className="invert">
					{theme === "dark" ? sun : moon}
				</div>
			</button>
			<div className="bg-fixed bg-cover bg-full bg-sea-light dark:bg-sea-dark text-stone-900 dark:text-stone-300 min-h-screen font-inter">
				{children}
			</div>
		</>
	)
}

export default TemplatePage;
