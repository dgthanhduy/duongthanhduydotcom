import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyBZVT03Zr_jwoeDuTySBSseTbkDXYvyvho',
    authDomain: 'duongthanhduy-c0e74.firebaseapp.com',
    projectId: 'duongthanhduy-c0e74',
    storageBucket: 'duongthanhduy-c0e74.appspot.com',
    messagingSenderId: '51168096648',
    appId: '1:51168096648:web:21cfce41ba10202f714a3d',
    measurementId: 'G-WSGV71NGXY',
};

let instance = initializeApp(firebaseConfig);

export default instance;

export const firestore = getFirestore(instance);
