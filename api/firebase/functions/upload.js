import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc as firestoreUpdateDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "../config";
import { toast } from "react-toastify";

const notify = (msg) => toast(msg);

const db = getFirestore(app);

async function postDoc(data, collectionName) {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return null;
  }

  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    const updatedData = {
      docId: docRef.id,
      userEmail: user.email,
    };
    await updateDoc(collectionName, docRef.id, updatedData);
    notify(`Invoice Posted Successfully`);
    return docRef;
  } catch (error) {
    notify(`Something Went Wrong`);
    return null;
  }
}

async function updateDoc(collectionName, docId, data) {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return false;
  }

  try {
    const docRef = doc(db, collectionName, docId);
    await firestoreUpdateDoc(docRef, data);
    notify(`Updated Successfully`);
    return true;
  } catch (error) {
    notify(`Something Went Wrong`);
    return false;
  }
}

async function addFrequentAddress(address) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    notify("You're not logged in");
    return false;
  }

  const docId = user.email;
  try {
    const docRef = doc(db, "users", docId);
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (!userData.frequentAddresses) {
        userData.frequentAddresses = [];
      }
      userData.frequentAddresses.push(address);
      await updateDoc("users", docId, userData);
      notify(`Frequent address added successfully.`);
      return true;
    } else {
      notify(`Something Went Wrong.`);
      return false;
    }
  } catch (error) {
    notify(`Something Went Wrong.`);
    return false;
  }
}

async function updateFrequentAddress(modifiedAddresses) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    notify("You're not logged in");
    return false;
  }

  const docId = user.email;
  const data = { frequentAddresses: modifiedAddresses };
  try {
    const docRef = doc(db, "users", docId);
    await firestoreUpdateDoc(docRef, data, { merge: true });
    notify(`Address Modified successfully.`);
    return true;
  } catch (error) {
    notify(`Something Went Wrong.`);
    return false;
  }
}

export { updateDoc, postDoc, addFrequentAddress, updateFrequentAddress };
