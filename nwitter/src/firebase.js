// Import the functions you need from the SDKs you need
import { NWEETS_KEY } from "config";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, updateDoc, doc, query, where, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const storageService = getStorage();

export const nweetsRef = collection(dbService, NWEETS_KEY);

// auth
export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    updateProfile
}

// firebase
export {
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    onSnapshot,
    doc,
    query,
    where,
    orderBy
}

export {
    ref,
    uploadString,
    getDownloadURL,
    deleteObject
}