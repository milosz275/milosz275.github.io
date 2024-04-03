import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import ErrorPage from "./pages/ErrorPage"
import * as urls from './urls';
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "Portfolio",
		};
	}
	render() {
        return (React.createElement(
		'div',
		{ className: 'App' },
		React.createElement(BrowserRouter, null,
		React.createElement(Routes, null,
		React.createElement(Route, { path: urls.ROOT_URL, element: React.createElement(MainPage, {}) }),
		React.createElement(Route, { path: '*', element: React.createElement(ErrorPage, {}), })
		))));
	}
  }

export default App;
