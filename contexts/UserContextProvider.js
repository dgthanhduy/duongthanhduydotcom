import React, { useState, useEffect } from "react";

import { getAuth } from "firebase/auth";

import firebase from "../lib/firebase";

const auth = getAuth(firebase);

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
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
  }, []);

  const toggleLogout = () => {
    setCurrentUser(null);
  };
  const toggleLogin = (user) => {
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
