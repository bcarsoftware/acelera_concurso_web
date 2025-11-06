import React, {createContext, useContext, useEffect} from "react";
import type {UserAdminResponse} from "../data/data";

export type AuthContextType = {
    token: string | null;
    user: UserAdminResponse | null;
    isLoading: boolean;
    login: ({ data, token }: { data: UserAdminResponse; token: string; }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthAdminContext = createContext<AuthContextType | null>(null);

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthAdminProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = React.useState<UserAdminResponse | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("userAdminToken");
        const userAdmin = localStorage.getItem("userAdmin");

        if (storedToken) setToken(storedToken);
        if (userAdmin) setUser(JSON.parse(userAdmin));

        setIsLoading(false);
    }, []);

    const login = async ({ data, token }: {
        data: UserAdminResponse, token: string
    }) => {
        setToken(token);
        setUser(data);
        localStorage.setItem("userAdminToken", token);
        localStorage.setItem("userAdmin", JSON.stringify(data));
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userAdminToken");
        localStorage.removeItem("userAdmin");
    }

    if (isLoading) {
        return (<div>{"Carregando..."}</div>);
    }

    return (
        <AuthAdminContext.Provider value={{ isLoading, token, user, login, logout }}>
            {children}
        </AuthAdminContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AuthAdminContext);
    if (!context) {
        throw new Error("useAuth Administrator must be used inside an AuthProvider");
    }
    return useContext(AuthAdminContext);
};
