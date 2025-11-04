import React, {createContext, useContext, useEffect} from "react";
import type {UserAdminResponse} from "../data/data";

type AuthContextType = {
    token: string | null;
    user: UserAdminResponse | null;
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
        const storedToken = localStorage.getItem("userToken");

        if (storedToken) setToken(storedToken);

        setIsLoading(false);
    }, []);

    const login = async ({ data, token }: {
        data: any, token: string
    }) => {
        setToken(token);
        setUser(data);
        localStorage.setItem("userAdminToken", token);
        localStorage.setItem("userAdminData", JSON.stringify(data));
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userAdminToken");
        localStorage.removeItem("userAdminData");
    }

    if (isLoading) {
        return (<div>{"Carregando..."}</div>);
    }

    return (
        <AuthAdminContext.Provider value={{ token, user, login, logout }}>
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
