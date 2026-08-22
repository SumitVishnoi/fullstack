import { createContext, useState, useEffect } from "react";
import { currentUser } from "./service/auth.api"; // Ensure this path is correct

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // Start as true to prevent UI flicker

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
