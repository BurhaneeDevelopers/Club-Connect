import { useState, useEffect } from "react";
import { collection, doc, getDocs, limit } from "firebase/firestore";

// JSON Data
import { db } from "../firebase";

const userGlobalUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renderedItems, setRenderedItems] = useState(5);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "allUsers"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching business: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadMoreData = () => {
    setLoading(true);
    try {
      // Increase the number of rendered items by 5
      setRenderedItems((prev) => prev + 3);
      setLoading(false);
    } catch (error) {}
  };
  return {
    fetchUsers,
    users,
    setUsers,
    loadMoreData,
    loading,
  };
};

export default userGlobalUsers;
