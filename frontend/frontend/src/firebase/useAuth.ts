import { useEffect, useState } from "react";

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

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

    return { loggedIn, loading };
};
