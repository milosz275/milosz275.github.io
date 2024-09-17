import React, { useEffect, useState } from "react";
import Intro from "../components/Intro";
import Portfolio from "../components/Portfolio";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { SetCookie } from "../components/SetCookie";
import { GetCookie } from "../components/GetCookie";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { sun, moon } from "../icons";
import { Store } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"

function MainPage() {
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		GoogleAnalytics();
	}, []);

	useEffect(() => {
		const createNotification = () => {
			Store.addNotification({
				title: "Welcome!",
				message: "Please feel free to explore my portfolio 🚀",
				type: "info",
				container: "bottom-right",
				insert: "bottom",
				animationIn: ["animate__animated", "animate__fadeIn"],
				animationOut: ["animate__animated", "animate__fadeOut"],
				dismiss: {
					duration: 5000,
					onScreen: true
				},
				onRemoval: () => {
					Store.addNotification({
						title: "Let's connect!",
						message: "You can reach out to me via the contact form below 📬",
						type: "info",
						container: "bottom-right",
						insert: "bottom",
						animationIn: ["animate__animated", "animate__fadeIn"],
						animationOut: ["animate__animated", "animate__fadeOut"],
						dismiss: {
							duration: 5000,
							onScreen: true
						}
					});
				}
			});
		};
		createNotification();
	}, []);

	useEffect(() => {
		const cookieConsent = GetCookie("cookie-consent");
		if (!cookieConsent) {
			Store.addNotification({
				title: "Cookies",
				message: "This website uses cookies to enhance the user experience.",
				type: "info",
				container: "bottom-right",
				insert: "bottom",
				animationIn: ["animate__animated", "animate__fadeIn"],
				animationOut: ["animate__animated", "animate__fadeOut"],
				dismiss: {
					duration: 5000,
					onScreen: true
				}
			});
			SetCookie("cookie-consent", "true");
		}
	}, []);

	useEffect(() => {
		const darkThemeCookie = GetCookie("dark-theme");
		if (darkThemeCookie) {
			setTheme(darkThemeCookie === "true" ? "dark" : "light");
		}
		else {
			setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		}
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	const handleThemeSwitch = () => {
		setTheme(theme === "dark" ? "light" : "dark");
		SetCookie("dark-theme", theme === "dark" ? "false" : "true");
	};

	return (
		<>
			<button
				type="button"
				onClick={handleThemeSwitch}
				className="fixed p-2 z-10 right-5 top-4 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300 text-lg rounded-md hover:scale-105">
				<div className="invert">
					{theme === "dark" ? sun : moon}
				</div>
			</button>
			<div className="bg-fixed bg-cover bg-full bg-sea-light dark:bg-sea-dark text-stone-900 dark:text-stone-300 min-h-screen font-inter">
				<div className="max-w-5xl w-11/12 mx-auto">
					<div id="intro">
						<Intro />
					</div>
					<div id="portfolio">
						<Portfolio />
					</div>
					<div id="timeline">
						<Timeline />
					</div>
					<div id="contact">
						<Contact />
					</div>
					<div id="footer">
						<Footer />
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage;
