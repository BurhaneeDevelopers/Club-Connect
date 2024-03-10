import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  getAuth,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// JSON Data
import names from "../randomName.json";
import userNames from "../randomUserName.json";
import { db } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState({
    name: null,
    userName: null,
    bio: null,
    location: null,
    profileImage: null,
    following: [],
    followers: [],
  });

  const [anonymousUser, setAnonymousUser] = useState({
    name: null,
    userName: null,
  });
  const [error, setError] = useState(null);

  const auth = getAuth();

  const fetchUserDetails = async (uid) => {
    const docRef = doc(db, "allUsers", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
      // console.log("Users ISSS", docSnap.data());
    } else {
      setUser(null);
    }
  };

  const fetchAnonymousUserDetails = async (uid) => {
    const docRef = doc(db, "anonymousUsers", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAnonymousUser(docSnap.data());
      // console.log(docSnap.data());
    } else {
      setAnonymousUser(null);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (auth.currentUser) {
        await fetchUserDetails(auth.currentUser.uid);
        await fetchAnonymousUserDetails(auth.currentUser.uid);
      }
    };

    initializeData();
  }, [auth.currentUser]);

  const handleSignIn = async (email, password, navigation) => {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        try {
          const user = userCredentials.user;
          if (user) {
            fetchUserDetails(auth.currentUser.uid);
          }
          console.log("Logged in with:", user.email);
          setError(false);
          AsyncStorage.setItem("playAnimation", "true");
          AsyncStorage.setItem("hasSignedIn", "true");
        } catch (error) {
          console.log("Error Is", error);
          return;
        }
      }
    );
  };

  const handleSignInAnonymously = async (navigation) => {
    try {
      // Generate a random index to select a name and username from the JSON
      const randomIndex = Math.floor(Math.random() * 35);
      const selectedName = names.names[randomIndex];
      const selectedUsername = userNames.usernames[randomIndex];

      await signInAnonymously(auth)
        .then((userCredential) => {
          // User created successfully
          const user = userCredential.user;
          const userRef = doc(db, "anonymousUsers", auth.currentUser.uid);
          setDoc(userRef, {
            uid: auth.currentUser.uid,
            name: selectedName,
            userName: selectedUsername,
          });
          console.log("AnonymousUser created:", user);

          // Store the selected name and username in local storage
          AsyncStorage.setItem("Name", selectedName);
          AsyncStorage.setItem("UserName", selectedUsername);

          AsyncStorage.setItem("playAnimation", "true");
          AsyncStorage.setItem("hasSignedIn", "true");
          navigation.navigate("LocationPick");
        })
        .catch((error) => {
          setError("An error occurred. Please try again.");
          console.error("Error signing in Anonymously:", error);
        });
    } catch (error) {
      console.error("Error while signing in anonymously:", error);
    }
  };

  return {
    user,
    setUser,
    anonymousUser,
    error,
    handleSignIn,
    handleSignInAnonymously,
    fetchUserDetails,
  };
};

export default useAuth;
