"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
    location.reload();
    notify("Sign up successful!");
    return true;
  } catch (error) {
    const errorMessage = error.message || "An error occurred during sign up.";
    notify(error.message);
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
    const userData = { email: email, password: password };
    await saveUserDataToUserDoc(email, userData);
    localStorage.setItem("user", JSON.stringify(user));
    await fetchUserData();
    location.reload();
    notify("Sign in successful!");
    return true;
  } catch (error) {
    notify(error.message);
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
    notify(error.message);
  }
}

async function fetchUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const userData = await fetchDocById(user.email, "users");
    localStorage.setItem("userDoc", JSON.stringify(userData));
    return userData;
  } catch (error) {
    notify(error.message);
    return null;
  }
}

async function userRole() {
  try {
    const role =
      (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    (JSON.parse(localStorage.getItem("user")) || {}).role || null;
    return role;
  } catch (error) {
    notify(error.message);
    return null;
  }
}

async function logout() {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("userDoc");
    location.reload();
    notify("Logout Succesfully");
    return true;
  } catch (error) {
    notify(error.message);
    return null;
  }
}

async function sendPasswordResetEmailLink(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    notify(`Password reset email sent to ${email}`);
  } catch (error) {
    notify(error.message);
  }
}

export {
  signUpWithEmail,
  signInWithEmail,
  saveUserDataToUserDoc,
  fetchUserData,
  userRole,
  logout,
  sendPasswordResetEmailLink,
};
