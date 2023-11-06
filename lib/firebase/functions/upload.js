import { addDoc, collection, doc, getFirestore, updateDoc as firestoreUpdateDoc } from "firebase/firestore"; // Renamed the imported function to avoid conflicts
import { app } from "../config";

const db = getFirestore(app);

async function postDoc(data, collectionName) {
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, data);
        const user = JSON.parse(localStorage.getItem("user"));
        const updatedData = {
            docId: docRef.id,
            userEmail: user.email,
        };
        await updateDoc(collectionName, docRef.id, updatedData); // Fixed: Used the correct function name
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
      await firestoreUpdateDoc(docRef, data); // Fixed: Used the correct function name
      console.log(`Document updated with user data successfully.`);
      return true;
    } catch (error) {
      console.error(`Error updating the document: ${error}`);
      return false;
    }
}

export { updateDoc, postDoc };
