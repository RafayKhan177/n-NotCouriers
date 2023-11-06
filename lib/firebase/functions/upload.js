<<<<<<< HEAD
import { addDoc, collection, doc, getFirestore, updateDoc as firestoreUpdateDoc } from "firebase/firestore"; // Renamed the imported function to avoid conflicts
import { app } from "../config";

const db = getFirestore(app);
=======
import { addDoc, collection, doc, getFirestore, updateDoc as firestoreUpdateDoc, getDoc } from "firebase/firestore";
import { app } from "../config";

const db = getFirestore(app);
const user = JSON.parse(localStorage.getItem("user"));
>>>>>>> origin/Development

async function postDoc(data, collectionName) {
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, data);
<<<<<<< HEAD
        const user = JSON.parse(localStorage.getItem("user"));
=======
>>>>>>> origin/Development
        const updatedData = {
            docId: docRef.id,
            userEmail: user.email,
        };
<<<<<<< HEAD
        await updateDoc(collectionName, docRef.id, updatedData); // Fixed: Used the correct function name
=======
        await updateDoc(collectionName, docRef.id, updatedData);
>>>>>>> origin/Development
        console.log(`New document created in ${collectionName} with ID: ${docRef.id} successfully.`);
        return docRef;
    } catch (error) {
        console.error(`Error creating a new document in ${collectionName}: ${error}`);
        return null;
    }
}

async function updateDoc(collectionName, docId, data) {
    try {
<<<<<<< HEAD
      const docRef = doc(db, collectionName, docId);
      await firestoreUpdateDoc(docRef, data); // Fixed: Used the correct function name
      console.log(`Document updated with user data successfully.`);
      return true;
    } catch (error) {
      console.error(`Error updating the document: ${error}`);
      return false;
    }
}

export { updateDoc, postDoc };
=======
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

export { updateDoc, postDoc, addFrequentAddress };
>>>>>>> origin/Development
