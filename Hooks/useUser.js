// useUser.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useUser;
