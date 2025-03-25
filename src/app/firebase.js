import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNVo-_UY9hrJgUrKw0h39cVi-BdFQFbhs",
    authDomain: "emotionscapes-32edc.firebaseapp.com",
    projectId: "emotionscapes-32edc",
    storageBucket: "emotionscapes-32edc.firebasestorage.app",
    messagingSenderId: "845911045710",
    appId: "1:845911045710:web:74e24b9497c77f743bf51f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, deleteDoc, doc };