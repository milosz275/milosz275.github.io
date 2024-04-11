export const googleAnalytics = () => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-SGT193QE7H";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-SGT193QE7H");
    };
};
