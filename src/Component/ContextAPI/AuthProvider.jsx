import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import auth from '../Firebase/Firebase.config';

export const ContextAPI = createContext('');
const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [selected, setSelected] = useState("asc");
    const handleMainDropdown = (value) => {
        setSelected(value);
    }
    
    const createUser =(email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);};
    
    const signUpWithGoogle = () => {
        return signInWithPopup(auth, provider)
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
    const userinfo = {
        handleMainDropdown, selected,sortUsersByAge,createUser,signInUser,signUpWithGoogle
    }

   
    return (
        <ContextAPI.Provider value={userinfo}>
            {children}
        </ContextAPI.Provider>
    );
};

export default AuthProvider;