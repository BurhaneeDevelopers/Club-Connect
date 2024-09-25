"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "@react-native-firebase/firestore";

const useAllBusiness = () => {
  const [allBusiness, setAllBusiness] = useState([]);

  const fetchAllBusiness = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));

      const businesses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllBusiness(businesses);
    } catch (error) {
      console.log("Error fetching business: ", error);
    }
  };

  const deleteBusiness = async (businessId) => {
    try {
      await deleteDoc(doc(db, "Products", businessId));
      setAllBusiness((prevProds) =>
        prevProds.filter((prod) => prod?.id !== businessId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting bill:", error.message);
    }
  };

  const duplicateBusiness = async (businessId) => {
    try {
      // Get the original bill data from Firestore
      const originalBusinessRef = doc(db, "Products", businessId);
      const originalBusinessSnapshot = await getDoc(originalBusinessRef);

      if (!originalBusinessSnapshot.exists) {
        console.log("Original Product not found");
        return;
      }

      // Create a new Prod with a new ID
      const newProdData = originalBusinessSnapshot.data();
      // console.log("DATAA IISS", originalBusinessSnapshot.data());
      const newProdCollectionRef = collection(db, "Products");

      await addDoc(newProdCollectionRef, newProdData);

      window.location.reload();
    } catch (error) {
      console.log("Error duplicating Product:", error);
    }
  };

  useEffect(() => {
    fetchAllBusiness();
  }, []);
  return {
    fetchAllBusiness,
    allBusiness,
    setAllBusiness,
    deleteBusiness,
    duplicateBusiness,
  };
};

export default useAllBusiness;
