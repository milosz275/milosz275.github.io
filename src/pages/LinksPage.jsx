import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Title from "../components/Title";
import portfolio from "../data/portfolio";
import { ROOT_URL } from "../urls";
import { SetCookie } from "../components/SetCookie";
import { GetCookie } from "../components/GetCookie";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { sun, moon } from "../icons";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function LinksPage() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(null);
    const [projectsWithLinks, setProjectsWithLinks] = useState([]);

    useEffect(() => {
        GoogleAnalytics();
    }, []);

    useEffect(() => {
        const createNotification = () => {
            Store.addNotification({
                title: "Links",
                message: "This is an endpoint overview of my projects.",
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
        };
        createNotification();
    }, []);

    useEffect(() => {
        const darkThemeCookie = GetCookie("dark-theme");
        if (darkThemeCookie) {
            setTheme(darkThemeCookie === "true" ? "dark" : "light");
        } else {
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

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const username = 'milosz275';
                const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
                const repos = reposResponse.data;

                const projectsWithDeployments = await Promise.all(
                    repos.map(async (repo) => {
                        const deploymentsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/deployments`);
                        if (deploymentsResponse.data.length > 0) {
                            return {
                                id: repo.id,
                                name: repo.name,
                                url: repo.html_url
                            };
                        }
                        return null;
                    })
                );

                setProjectsWithLinks(projectsWithDeployments.filter(repo => repo !== null));
            } catch (error) {
                console.error('Error fetching repositories or deployments:', error);
            }
        };

        fetchRepos();
    }, []);

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
                    <div id="container" className="pt-20 pb-20">
                        <Title id="0">
                            Links
                        </Title>
                        <div
                            className="mb-12 hover:underline cursor-pointer"
                            onClick={() => navigate(ROOT_URL)}>
                            Back to main page
                        </div>
                        <div id="links" className="w-full grid grid-cols-1">
                            <table className="min-w-full bg-white/[.2] dark:bg-gray-800">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Project Name</th>
                                        <th className="py-2 px-4 border-b">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectsWithLinks.map(project => (
                                        <tr key={project.id}>
                                            <td
                                                className="p-4 border rounded-md shadow-md bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300"
                                                style={{ minHeight: "250px" }}
                                            >
                                                {project.name}
                                            </td>
                                            <td
                                                className="p-4 border rounded-md shadow-md bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300"
                                                style={{ minHeight: "250px" }}
                                            >
                                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    {project.url}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LinksPage;
