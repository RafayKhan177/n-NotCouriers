import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { toast } from "react-toastify";
  import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
  
  const storage = getStorage();
  const db = getFirestore();
  
  const notify = (msg) => toast(msg);
  
  async function uploadPicture(file) {
    const storageRef = ref(storage, "blogsPic");
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }
  
  export {  };