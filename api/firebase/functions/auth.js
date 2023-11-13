"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../config";
import { toast } from "react-toastify";
import { fetchDocById } from "./fetch";
// useRouter

const auth = getAuth(app);
const db = getFirestore();

const notify = (msg) => toast(msg);

async function signUpWithEmail(email, password, userData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await saveUserDataToUserDoc(email, userData);
    notify("Sign up successful!");
    return true;
  } catch (error) {
    const errorMessage = error.message || "An error occurred during sign up.";
    notify("Something Went Wrong");
    throw error;
  }
}

async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = { email: email, key: password };
    await saveUserDataToUserDoc(email, userData);
    localStorage.setItem("user", JSON.stringify(user));
    await fetchUserData();
    notify("Sign in successful!");
    return true;
  } catch (error) {
    notify("Something Went Wrong");
    throw error;
  }
}

async function saveUserDataToUserDoc(email, userData) {
  try {
    const userDocRef = doc(db, "users", email);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // The document exists, update it
      for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
          await updateDoc(userDocRef, { [key]: userData[key] });
        }
      }
    } else {
      // The document doesn't exist, create a new one
      await setDoc(userDocRef, userData);
    }

    notify("Info Updated!");
  } catch (error) {
    const errorMessage =
      error.message || "An error occurred while saving user data.";
    notify("Something Went Wrong");
  }
}

async function fetchUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const userData = await fetchDocById(user.email, "users");
    localStorage.setItem("userDoc", JSON.stringify(userData));
    return userData;
  } catch (error) {
    notify("Something Went Wrong");
    return null;
  }
}

const userRole = () => {
  try {
    const role =
      (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
      (JSON.parse(localStorage.getItem("user")) || {}).role || null;
    return role;
  } catch (error) {
    notify("Something Went Wrong");
    return null;
  }
};

const logout = () => {
  try {
    localStorage.removeItem("user");
    notify("Logout Succesfully");
    return true;
  } catch (error) {
    notify("Something Went Wrong");
    return null;
  }
};

export {
  signUpWithEmail,
  signInWithEmail,
  saveUserDataToUserDoc,
  fetchUserData,
  userRole,
  logout,
};
