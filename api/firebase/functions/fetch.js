import { getAuth } from "firebase/auth";
import {
    doc,
    getDoc,
    getFirestore,
} from "firebase/firestore";
import { app } from "../config";
import { toast } from "react-toastify";

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
        return doc.data()
    } catch (error) {
        notify("Error fetching Doc:", error);
    }
}

async function fetchFrequentAddresses() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.email,"wow")
    const docId = user.email;
    const docRef = doc(db, "users", docId);
    try {
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
            notify("Doc not found.");
            return null;
        }
        return docSnapshot.data().frequentAddresses;
    } catch (error) {
        notify("Error fetching Doc: " + error.message);
        return null;
    }
}


export { fetchDocById, fetchFrequentAddresses };
