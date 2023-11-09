import { addDoc, collection, doc, getFirestore, updateDoc as firestoreUpdateDoc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../config";

const db = getFirestore(app);

async function postDoc(data, collectionName) {
    const user = JSON.parse(localStorage.getItem("userDoc"));
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, data);
        const updatedData = {
            docId: docRef.id,
            userEmail: user.email
        };
        await updateDoc(collectionName, docRef.id, updatedData);
        console.log(`New document created in ${collectionName} with ID: ${docRef.id} successfully.`);
        return docRef;
    } catch (error) {
        console.error(`Error creating a new document in ${collectionName}: ${error}`);
        return null;
    }
}

async function updateDoc(collectionName, docId, data) {
    try {
        const docRef = doc(db, collectionName, docId);
        await firestoreUpdateDoc(docRef, data);
        console.log(`Document updated with user data successfully.`);
        return true;
    } catch (error) {
        console.error(`Error updating the document: ${error}`);
        return false;
    }
}

async function addFrequentAddress(address) {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = user.email
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
            console.log(`Frequent address added to the user document successfully.`);
            return true;
        } else {
            console.error(`User document not found.`);
            return false;
        }
    } catch (error) {
        console.error(`Error adding frequent address: ${error}`);
        return false;
    }
}
async function updateFrequentAddress(modifiedAddresses) {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = user.email;
    const data = { frequentAddresses: modifiedAddresses };
    console.log(modifiedAddresses)
    try {
        const docRef = doc(db, "users", docId);
        await firestoreUpdateDoc(docRef, data, { merge: true });
        console.log(`Document updated successfully.`);
        return true;
    } catch (error) {
        console.error(`Error updating the document: ${error}`);
        return false;
    }
}



export { updateDoc, postDoc, addFrequentAddress, updateFrequentAddress };
