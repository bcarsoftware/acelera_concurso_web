import React, {createContext, useContext, useEffect} from "react";
import type {UserResponse} from "../data/data";

type AuthContextType = {
    token: string | null;
    user: UserResponse | null;
    isLoading: boolean;
    login: (user: UserResponse, token: string) => Promise<void>;
    logout: () => Promise<void>;
    reflash: (user: UserResponse) => Promise<void>;
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
        const storedUser = localStorage.getItem("userData");

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        setIsLoading(false);
    }, []);

    const login = async (user: UserResponse, token: string) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
    }

    const reflash = async (user: UserResponse) => {
        setUser(user);
        localStorage.setItem("userData", JSON.stringify(user));
    };

    if (isLoading) {
        return (<div>{"Carregando..."}</div>);
    }

    return (
        <AuthContext.Provider value={{ token, user, isLoading, login, logout, reflash }}>
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
