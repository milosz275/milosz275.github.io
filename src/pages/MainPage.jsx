import React, { useEffect } from "react";
import TemplatePage from "../pages/TemplatePage";
import Intro from "../components/Intro";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { setCookie } from "../functions/setCookie";
import { getCookie } from "../functions/getCookie";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { Store } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"

function MainPage() {
	useEffect(() => {
		GoogleAnalytics();
	}, []);

	useEffect(() => {
		const lastLogin = localStorage.getItem("lastLogin");
		if (lastLogin) {
			if (new Date().getTime() - new Date(lastLogin).getTime() < 86400000) { // 24 hours
				return;
			}
		} else {
			localStorage.setItem("lastLogin", new Date().toISOString());
		}
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
		const cookieConsent = getCookie("cookie-consent");
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
			setCookie("cookie-consent", "true");
		}
	}, []);

	return (
		<TemplatePage>
			<div className="max-w-5xl w-11/12 mx-auto">
				<div id="intro">
					<Intro />
				</div>
				<div id="portfolio">
					<Portfolio />
				</div>
				<div id="contact">
					<Contact />
				</div>
				<div id="footer">
					<Footer />
				</div>
			</div>
		</TemplatePage>
	)
}

export default MainPage;
