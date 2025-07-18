import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';

export const ContextAPI = createContext('');
const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [selected, setSelected] = useState("asc");
    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleMainDropdown = (value) => {
        setSelected(value);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUpWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const signOutUser = () => {
        setLoading(false);
        return signOut(auth);
    }
    // Function to sort users by age based on the homepage of customer
    const sortUsersByAge = (users, selected) => {
        if (selected === 'asc') {
            // Sort by age ascending
            return [...users].sort((a, b) => a.age - b.age);
        } else if (selected === 'desc') {
            // Sort by age descending
            return [...users].sort((a, b) => b.age - a.age);
        } else {
            // No sorting, return as is
            return users;
        }
    };

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser);
                setUser(currentUser);
                setLoading(false);
            }
            else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            Unsubscribe();
        };
    }, [])
    const userinfo = {
        handleMainDropdown, selected, sortUsersByAge, createUser, signInUser, signUpWithGoogle, signOutUser, loading, users,setLoading
    }


    return (
        <ContextAPI.Provider value={userinfo}>
            {children}
        </ContextAPI.Provider>
    );
};

export default AuthProvider;