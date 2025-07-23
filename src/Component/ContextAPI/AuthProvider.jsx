import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Pages/Loading';


export const ContextAPI = createContext('');
const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [selected, setSelected] = useState("asc");
    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentRoute, setCurrentRoute] = useState("edit-biodata");
    const [filter, setfilter] = useState([]);
    const AxiosSecure = useAxiosSecure();

    //get logged in user role

    const { data: allregisteredUser, isPending, isError } = useQuery({
        queryKey: ["user-role"], // cache by email
        queryFn: async () => {
            const res = await AxiosSecure.get("/registereduser");
            return res.data
        }
    })


    //drop down for sorting by age in main home page start
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

    // firebase authentication start

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
    }, []);
    // firebase authentication end

    isPending && <Loading></Loading>
    isError && <div>Error: {isError.message}</div>
    let currentUser = [];
    if (allregisteredUser && users) {
        console.log(users?.email, allregisteredUser)
        currentUser = allregisteredUser.filter(all => {  return all.email === users?.email })
        // console.log("This is Current User",currentUser)
    }
    
    const role = currentUser[0]?.role;
    // console.log("This is role",role)
    const userinfo = {
        handleMainDropdown, selected, sortUsersByAge, createUser,
        signInUser, signUpWithGoogle, signOutUser, loading, users,
        setLoading, currentRoute, setCurrentRoute, filter, setfilter,role
    }


    return (
        <ContextAPI.Provider value={userinfo}>
            {children}
        </ContextAPI.Provider>
    );
};

export default AuthProvider;