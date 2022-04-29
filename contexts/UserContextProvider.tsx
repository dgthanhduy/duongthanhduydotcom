import React, { useState, useEffect } from 'react';

import { getAuth } from 'firebase/auth';

import firebase from '../lib/firebase';
import { User, UserContext as UserContextType } from '../types';

const auth = getAuth(firebase);

const defaultContextValue: UserContextType = {
    currentUser: null,
    isAuthLoading: false,
    setIsAuthLoading: (value: boolean) => {},
};

export const UserContext = React.createContext(defaultContextValue);

const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    useEffect(() => {
        const unsubOnAuthStateChanged = auth.onAuthStateChanged(function (
            user,
        ) {
            if (user) {
                toggleLogin({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                });
            } else {
                toggleLogout();
            }
        });

        return () => unsubOnAuthStateChanged();
    }, []);

    const toggleLogout = () => {
        setCurrentUser(null);
    };

    const toggleLogin = (user: User) => {
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider
            value={{
                currentUser: currentUser,
                isAuthLoading: isAuthLoading,
                setIsAuthLoading: setIsAuthLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
