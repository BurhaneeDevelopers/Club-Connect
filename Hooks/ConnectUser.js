import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, getAuth } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const generateUniqueId = () => {
  return uuidv4();
};

const connectUsers = async (currentUserUid, otherUserUid) => {
  const auth = getAuth();

  try {
    const connectionsCollectionRef = collection(db, "connections");

    // Create a unique connection ID
    const connectionId = generateUniqueId();

    // Check if the connection already exists
    const existingConnectionRef = doc(connectionsCollectionRef, connectionId);
    const existingConnectionSnapshot = await getDoc(existingConnectionRef);

    if (existingConnectionSnapshot.exists()) {
      console.log("Connection already exists.");
    } else {
      // Create a new connection document
      await setDoc(existingConnectionRef, {
        createdAt: serverTimestamp(),
      });

      // Add users to the connection subcollection
      const usersCollectionRef = collection(existingConnectionRef, "users");
      await addDoc(usersCollectionRef, { uid: currentUserUid });
      await addDoc(usersCollectionRef, { uid: otherUserUid });

      console.log("Connection created successfully!", connectionId);
    }
  } catch (error) {
    console.error("Error connecting users:", error);
  }
};

export { connectUsers, generateUniqueId };
