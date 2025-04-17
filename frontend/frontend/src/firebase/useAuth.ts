import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("http://localhost:8080/profile", {
                    credentials: "include",
                });

                if (response.ok) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);


    const logout = async () => {
        navigate("/home")
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                setLoggedIn(false);
            } else {
                throw new Error("Logout failed");
            }

        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return { loggedIn, loading  ,setLoggedIn , logout};
};
