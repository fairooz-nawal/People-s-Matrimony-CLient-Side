import React, { createContext, useState } from 'react';

export const ContextAPI = createContext('');
const AuthProvider = ({ children }) => {
    const [selected, setSelected] = useState("asc");
    const handleMainDropdown = (value) => {
        setSelected(value);
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
    const auth = {
        handleMainDropdown, selected,sortUsersByAge
    }

   
    return (
        <ContextAPI.Provider value={auth}>
            {children}
        </ContextAPI.Provider>
    );
};

export default AuthProvider;