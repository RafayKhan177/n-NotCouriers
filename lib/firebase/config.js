"use client"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD0mIMcqlFDqqoSlyl_7mRuqnFrbyzP0z0",
    authDomain: "notcouriers.firebaseapp.com",
    projectId: "notcouriers",
    storageBucket: "notcouriers.appspot.com",
    messagingSenderId: "1092306819713",
    appId: "1:1092306819713:web:f2937e92111991c2a80b80",
    measurementId: "G-9MVKCVCDW9"
};

export const app = initializeApp(firebaseConfig);