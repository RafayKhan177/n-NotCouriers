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
const db = getFirestore(app);

const notify = (msg) => console.log(msg);

async function fetchDocById(docId, collectionName) {
  const docRef = doc(db, collectionName, docId);
  try {
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      notify("Doc not found.");
      return null;
    }
    return docSnapshot.data();
  } catch (error) {
    notify("Error fetching Doc:", error);
  }
}

async function fetchFrequentAddresses() {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return null;
  }
  try {
    const user = await fetchUserData();
    return user.frequentAddresses;
  } catch (error) {
    notify("Something Went Wrong");
    return null;
  }
}

async function fetchPlace_booking() {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return [];
  }
  try {
    const collectionRef = collection(db, "place_bookings");
    const q = query(collectionRef, where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    fetchUserData();
    return documents;
  } catch (error) {
    notify("Something Went Wrong");
    return [];
  }
}
async function fetchPlace_job() {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return [];
  }
  try {
    const collectionRef = collection(db, "place_job");
    const q = query(collectionRef, where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    fetchUserData();
    return documents;
  } catch (error) {
    notify("Something Went Wrong");
    return [];
  }
}
async function getDocByDateAndId(collectionName, id, date) {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return null;
  }

  try {
    const q = query(
      collection(db, collectionName),
      where("docId", "==", id),
      where("date", "==", date)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    const doc = querySnapshot.docs[0].data();
    return doc.docId;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getCollection(collectionName) {
  const user = JSON.parse(localStorage.getItem("userDoc"));
  if (!user) {
    notify("You're not logged in");
    return [];
  }
  try {
    const q = collection(db, collectionName);
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;
  } catch (error) {
    notify("Something Went Wrong fetching");
    return [];
  }
}

async function fetchOptions() {
  const docRef = doc(db, "data", "options");
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

async function getBookingsBetweenDates(
  fromDateString,
  toDateString,
  reference
) {
  try {
    const collectionRef = collection(db, "place_bookings");
    const q = query(
      collectionRef,
      where("serviceInformation.date", ">=", fromDateString),
      where("serviceInformation.date", "<=", toDateString),
      where("dropDetails.dropReference1", "==", reference)
    );

    const querySnapshot = await getDocs(q);
    const docs = [];

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      docs.push(docData);
      console.log("Document data:", docData);
    });

    console.log(docs);

    return docs;
  } catch (error) {
    console.error("Error:", error);
    notify(`Something Went Wrong`);
    return null;
  }
}

export {
  fetchDocById,
  fetchFrequentAddresses,
  fetchPlace_booking,
  fetchPlace_job,
  getDocByDateAndId,
  getCollection,
  fetchOptions,
  getBookingsBetweenDates,
};
