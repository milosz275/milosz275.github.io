import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { ROOT_URL } from "../../urls";
import './ErrorPage.css';

const ErrorPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const redirectToMainPage = () => {
            navigate(ROOT_URL);
        }
        redirectToMainPage()
      }, [navigate]);

    return <div className={"ErrorPage"}></div>
};

export default ErrorPage;
