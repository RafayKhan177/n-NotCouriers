import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../config";
import { toast } from "react-toastify";
import { fetchUserData } from "./auth";

const auth = getAuth(app);
const db = getFirestore();

const notify = (msg) => toast(msg);

async function fetchDocById(docId, collectionName) {
  const docRef = doc(db, collectionName, docId);
  try {
    const doc = await getDoc(docRef);
    if (!doc.exists()) {
      notify("Doc not found.");
    }
    return doc.data();
  } catch (error) {
    notify("Error fetching Doc:", error);
  }
}

async function fetchFrequentAddresses() {
  try {
    const user = await fetchUserData();
    return user.frequentAddresses;
  } catch (error) {
    notify("Error Fetching Addresses: " + error.message);
    return null;
  }
}

async function fetchRecentInvoices() {
  const user = await fetchUserData();
  try {
    const collectionRef = collection(db, "invoices");
    const q = query(collectionRef, where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    notify("Error fetching Invoices:", error.message);
    return [];
  }
}

async function getDocByDateAndId(collectionName, targetDate, docId) {
  try {
    const q = query(
      collection(db, collectionName),
      where("docId", "==", docId),
      where("serviceInformation.date", "==", targetDate)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    const doc = querySnapshot.docs[0].data();
    return doc.docId;
  } catch (error) {
    notify("Wrong Information");
    return null;
  }
}

export {
  fetchDocById,
  fetchFrequentAddresses,
  fetchRecentInvoices,
  getDocByDateAndId,
};
