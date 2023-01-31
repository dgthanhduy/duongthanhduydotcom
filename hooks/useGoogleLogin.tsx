// Deprecated

// import { useContext } from 'react';

// import {
//     getAuth,
//     signInWithPopup,
//     GoogleAuthProvider,
//     signOut,
// } from 'firebase/auth';

// import firebase from '../lib/firebase';
// import { UserContext } from '../contexts/UserContextProvider';

// const auth = getAuth(firebase);
// const authProvider = new GoogleAuthProvider();

const useGoogleLogin = () => {
    // const { currentUser, setIsAuthLoading, isAuthLoading } =
    //     useContext(UserContext);
    // const login = () => {
    //     if (!currentUser) {
    //         setIsAuthLoading(true);
    //         signInWithPopup(auth, authProvider).finally(() => {
    //             setIsAuthLoading(false);
    //         });
    //     }
    // };
    // const logout = () => {
    //     if (currentUser) {
    //         setIsAuthLoading(true);
    //         signOut(auth).finally(() => {
    //             setIsAuthLoading(false);
    //         });
    //     }
    // };
    // return {
    //     currentUser,
    //     login,
    //     logout,
    //     isAuthLoading,
    // };
};

export default useGoogleLogin;
