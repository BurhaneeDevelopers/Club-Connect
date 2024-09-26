import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    name: null,
    userName: null,
    bio: null,
    location: null,
    profileImage: null,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);

  const fetchUserDetails = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserDetails(docSnap.data());
    } else {
      setUserDetails(null);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (auth.currentUser) {
        await fetchUserDetails(auth.currentUser.uid);
        setIsSignedIn(true);
      }
    };

    initializeData();
  }, [auth.currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserDetails(user.uid);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth, fetchUserDetails]);

  const signIn = async () => {
    setIsSignedIn(true);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        setUserDetails,
        fetchUserDetails,
        isSignedIn,
        signIn,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
