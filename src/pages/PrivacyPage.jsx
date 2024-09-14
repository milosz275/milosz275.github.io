import { useEffect } from "react";
import LogOut from "../handlers/useLogOut";

const PrivacyPage = () => {
    const logout = LogOut();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <></>
    );
}

export default PrivacyPage;
