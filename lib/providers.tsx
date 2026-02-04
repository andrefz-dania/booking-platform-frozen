"use client";
import { JWT_AUTO_REFRESH_INTERVAL } from "@/config/constants";
import { jwtUserType, userData } from "@/types/types";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import { createContext, useContext } from "react";

export const AccessProvider = createContext<{
    token: string | null;
    userData: userData | null;
    setToken: (token: string | null) => void;
    refreshToken: () => void;
}>({
    token: null,
    userData: null,
    setToken: () => {},
    refreshToken: () => {},
});

export const useToken = () => useContext(AccessProvider);

export default function AccessProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const noUser: userData = {
        userId: undefined,
        isAdmin: false,
    };
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<userData>(noUser);

    function refreshToken() {
        // only try to refresh if token has expired
        if (token === null) {
            const url = "/api/auth/refresh";
            fetch(url, { method: "GET" })
                .then((r) => r.json())
                .then((data) => {
                    // only set token if auth server responed with a valid string
                    if (data.accessToken && data.accessToken.length > 1) {
                        setToken(data.accessToken);
                    }
                });
        }
    }

    useEffect(() => {
        refreshToken();
        // automatically refresh token when it expires based on constant
        const intervalId = setInterval(refreshToken, JWT_AUTO_REFRESH_INTERVAL);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // whenever the token is updated, extract user data for frontend UI display
        if (token != null) {
            const decoded = jwt.decode(token) as jwtUserType;
            setUserData({
                userId: decoded.userId || undefined,
                isAdmin: decoded.isAdmin || false,
            });
        } else {
            setUserData(noUser);
        }
    }, [token]);

    return (
        <AccessProvider.Provider
            value={{ token, setToken, refreshToken, userData }}
        >
            {children}
        </AccessProvider.Provider>
    );
}
