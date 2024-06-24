import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage"
import UAVPage from "./pages/UAVPage"
import PicoLedPage from "./pages/PicoLedPage"
import ErrorPage from "./pages/ErrorPage"
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
		React.createElement(Route, { path: urls.UAV_URL, element: React.createElement(UAVPage, {}) }),
		React.createElement(Route, { path: urls.PICO_LED_URL, element: React.createElement(PicoLedPage, {}) }),
		React.createElement(Route, { path: "*", element: React.createElement(ErrorPage, {}), })
		))));
	}
  }

export default App;
