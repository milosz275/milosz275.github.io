import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TemplatePage from "../pages/TemplatePage";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { ROOT_URL } from "../urls";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function ReposPage() {
    const navigate = useNavigate();
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commitCounts, setCommitCounts] = useState({});
    const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

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
            });
        };
        createNotification();
    }, []);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/milosz275/repos");
                if (response.status === 403) {
                    setRateLimitExceeded(true);
                    setLoading(false);
                    return;
                }
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

    const fetchCommitCount = async (repo, retryCount = 0) => {
        const maxRetries = 3;
        const retryDelay = 60000;

        try {
            const response = await axios.get(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1&page=1`);
            const linkHeader = response.headers.link;
            if (linkHeader) {
                const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
                return lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
            } else {
                return 1;
            }
        } catch (error) {
            if (error.response && error.response.status === 403 && retryCount < maxRetries) {
                console.warn(`Rate limit exceeded for ${repo.full_name}. Retrying in ${retryDelay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                return fetchCommitCount(repo, retryCount + 1);
            } else {
                console.error(`Error fetching commits for ${repo.full_name}:`, error);
                return 'Error';
            }
        }
    };

    useEffect(() => {
        const fetchCommitCounts = async () => {
            const counts = {};
            for (const repo of repos) {
                counts[repo.id] = await fetchCommitCount(repo);
            }
            setCommitCounts(counts);
        };

        if (repos.length > 0) {
            fetchCommitCounts();
        }
    }, [repos]);

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

    function formatSize(size) {
        if (size < 1024) {
            return `${size.toFixed(2)} KB`;
        } else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(2)} MB`;
        } else if (size < 1024 * 1024 * 1024) {
            return `${(size / (1024 * 1024)).toFixed(2)} GB`;
        } else {
            return `${(size / (1024 * 1024 * 1024)).toFixed(2)} TB`;
        }
    }

    return (
        <TemplatePage>
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
                        ) : rateLimitExceeded ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-red-500">
                                API rate limit exceeded. Please try again later.
                            </div>
                        ) : (
                            repos.map((repo) => (
                                <div
                                    key={repo.id}
                                    className="p-4 border rounded-md shadow-md bg-gradient-to-t from-slate-100/[.2] to-slate-200[.1] hover:bg-slate-200 dark:hover:bg-github transition-all duration-300 flex flex-col justify-between"
                                    style={{ minHeight: "250px" }}
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
                                            Commits: {commitCounts[repo.id] !== undefined ? commitCounts[repo.id] : 'Loading...'}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            Size: {formatSize(repo.size)}
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
        </TemplatePage>
    );
}

export default ReposPage;
