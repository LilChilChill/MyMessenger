// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey : "AIzaSyBlR_5YiPsDtIdc8uRPWR5oFIg7jTRdqWo" , 
    authDomain : "chat-app-1670d.firebaseapp.com" , 
    projectId : "chat-app-1670d" , 
    storageBucket : "chat-app-1670d.appspot.com" , 
    messagingSenderId : "1070656965656" , 
    appId : "1:1070656965656:web:35a7e4cb62930bbbdc876d" , 
    measurementId : "G-LN4236KHXP" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
