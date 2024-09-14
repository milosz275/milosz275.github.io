import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import reportWebVitals from "./reportWebVitals";
import { ReactNotifications } from 'react-notifications-component'
import "./styles/tailwind.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ReactNotifications />
    <App />
  </>
)
reportWebVitals(console.log);
