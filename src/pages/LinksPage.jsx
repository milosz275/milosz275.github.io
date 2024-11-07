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

function LinksPage() {
    const navigate = useNavigate();
    const [projectsWithLinks, setProjectsWithLinks] = useState([]);
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
                if (error.response && error.response.status === 403) {
                    console.warn(`Rate limit exceeded`);
                    setRateLimitExceeded(true);
                } else {
                    console.error('Error fetching repositories or deployments:', error);
                }
            }
        };

        fetchRepos();
    }, []);

    return (
        <TemplatePage>
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
                        {rateLimitExceeded ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-red-500">
                                API rate limit exceeded. Please try again later.
                            </div>
                        ) : (
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
                                        </tr>))}
                                </tbody>
                            </table>
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

export default LinksPage;
