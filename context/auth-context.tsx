import React, {createContext, useContext, useEffect} from "react";
import type {UserResponse} from "../data/data";

type AuthContextType = {
    token: string | null;
    user: UserResponse | null;
    login: ({ data, token }: { data: UserResponse; token: string; }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = React.useState<UserResponse | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");

        if (storedToken) setToken(storedToken);

        setIsLoading(false);
    }, []);

    const login = async ({ data, token }: {
        data: any, token: string
    }) => {
        setToken(token);
        setUser(data);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(data));
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
    }

    if (isLoading) {
        return (<div>{"Carregando..."}</div>);
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return useContext(AuthContext);
};
