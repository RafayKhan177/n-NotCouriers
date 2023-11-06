import { getAuth } from "firebase/auth";
import {
    doc,
    getDoc,
    getFirestore,
} from "firebase/firestore";
import { app } from "../config";
import { toast } from "react-toastify";
import { fetchUserData } from "./auth"

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
    try {
        const user = await fetchUserData()
        return user.frequentAddresses
    } catch (error) {
        notify("Error fetching Doc: " + error.message);
        return null;
    }
}


export { fetchDocById, fetchFrequentAddresses };
