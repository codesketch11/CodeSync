import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    // Restore login after page refresh
    useEffect(() => {
        const restoreUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await getCurrentUser(token);

                setUser(data.user);
            } catch (error) {
                console.error("Session restore failed:", error);

                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreUser();
    }, [token]);

    // Login
    const login = async (email, password) => {
        const data = await loginUser(email, password);

        localStorage.setItem("token", data.token);

        setToken(data.token);
        setUser(data.user);

        return data;
    };

    // Register
    const register = async (name, email, password) => {
        const data = await registerUser(
            name,
            email,
            password
        );

        return data;
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};