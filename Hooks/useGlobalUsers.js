import { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";

// JSON Data
import { db, getAuth } from "../firebase";

const userGlobalUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "allUsers");
      const usersSnapshot = await getDocs(usersCollection);

      const fetchedUsers = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        fetchedUsers.push(userData);
        // console.log(userData);
      });

      setUsers(fetchedUsers);

      // console.log("Fetched users:", fetchedUsers);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    fetchUsers,
    users,
    setUsers,
  };
};

export default userGlobalUsers;
