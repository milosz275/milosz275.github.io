import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage"
import ReposPage from "./pages/ReposPage"
import LinksPage from "./pages/LinksPage"
import UAVPage from "./pages/UAVPage"
import CheckersGamePage from "./pages/CheckersGamePage"
import ErrorPage from "./pages/ErrorPage"
import PrivacyPage from "./pages/PrivacyPage"
import * as urls from "./urls";

let docTitle = document.title;
window.onfocus = () => {
	document.title = docTitle;
};
window.onblur = () => {
	document.title = "Miłosz Maculewicz";
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "Portfolio",
		};
	}
	render() {
		return (React.createElement(
			"div",
			{ className: "App" },
			React.createElement(BrowserRouter, null,
				React.createElement(Routes, null,
					React.createElement(Route, { path: urls.ROOT_URL, element: React.createElement(MainPage, {}) }),
					React.createElement(Route, { path: urls.REPOS_URL, element: React.createElement(ReposPage, {}) }),
					React.createElement(Route, { path: urls.LINKS_URL, element: React.createElement(LinksPage, {}) }),
					React.createElement(Route, { path: urls.UAV_URL, element: React.createElement(UAVPage, {}) }),
					React.createElement(Route, { path: urls.UAV_COLL_URL, element: React.createElement(UAVPage, {}) }),
					React.createElement(Route, { path: urls.CHECKERS_URL, element: React.createElement(CheckersGamePage, {}) }),
					React.createElement(Route, { path: urls.CHECKERS_GAME_URL, element: React.createElement(CheckersGamePage, {}) }),
					React.createElement(Route, { path: urls.PRIVACY_URL, element: React.createElement(PrivacyPage, {}) }),
					React.createElement(Route, { path: "blog-app", element: null }),
					React.createElement(Route, { path: "*", element: React.createElement(ErrorPage, {}), })
				))));
	}
}

export default App;
