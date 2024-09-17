import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { SetCookie } from "../components/SetCookie";
import { GetCookie } from "../components/GetCookie";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { sun, moon } from "../icons";
import { Store } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { ROOT_URL } from "../urls";

function ReposPage() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GoogleAnalytics();
    }, []);

    useEffect(() => {
        const createNotification = () => {
            Store.addNotification({
                title: "GitHub Repositories",
                message: "Feel free to review my GitHub repos.",
                type: "info",
                container: "bottom-right",
                insert: "bottom",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        }
        createNotification();
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

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/mldxo/repos");
                const data = await response.json();
                setRepos(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch repos:", error);
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    const placeholderCards = Array(6).fill(0).map((_, index) => (
        <div key={index} className="p-4 border rounded-md shadow-md bg-slate-200 dark:bg-slate-800 animate-pulse">
            <div className="h-10 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 mb-3 w-3/4"></div>
            <div className="h-10 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 mb-2 w-full"></div>
            <div className="h-5 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 mb-2 w-5/6"></div>
            <div className="h-5 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 w-1/2"></div>
            <div className="h-5 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 w-1/2"></div>
            <div className="h-4 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 mb-2 w-5/6"></div>
            <div className="h-3 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 w-1/2"></div>
            <div className="h-3 bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] transition-all duration-300 w-1/2"></div>
        </div>
    ));

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
                            GitHub Repositories
                        </Title>
                        <div
                            className="mb-12 hover:underline cursor-pointer"
                            onClick={() => navigate(ROOT_URL)}>
                            Back to main page
                        </div>
                        <div id="repos" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                placeholderCards
                            ) : (
                                repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="p-4 border rounded-md shadow-md bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300 flex flex-col justify-between"
                                        style={{ minHeight: "250px" }}  // Optional: Adjust min-height to fit your layout
                                    >
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-github dark:text-slate-300">
                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                    {repo.name}
                                                </a>
                                            </h3>
                                            <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                                                {repo.description ? repo.description : "No description available."}
                                            </p>
                                            
                                        </div>
                                        <div className="mt-4">
                                            {repo.archived && (
                                                <p className="text-xs text-gray-500 dark:text-gray-500 opacity-50">
                                                    Archived
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                Language: {repo.language || "Not specified"}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                Stars: {repo.stargazers_count} | Forks: {repo.forks_count} | Watching: {repo.watchers_count} | Issues: {repo.open_issues_count}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                Size: {(repo.size / 1024).toFixed(2)} MB
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                Last updated: {new Date(repo.updated_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                    <div id="footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReposPage;
