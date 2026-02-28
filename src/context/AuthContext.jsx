import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext({
    user: null,
    loading: true,
    logOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
