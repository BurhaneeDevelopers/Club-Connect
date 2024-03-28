import { useState, useEffect, useMemo, useRef } from "react";
import {
  getDoc,
  setDoc,
  updateDoc,
  doc,
  addDoc,
  collection,
  query,
  getDocs,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const auth = getAuth();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // uploadImage();
    }
  };

  // Function to handle image upload and return the download URL
  const randomId = uuidv4();
  const uploadImage = async (setLoading) => {
    setLoading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(getStorage(), `postImage/${randomId}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);
      setLoading(false);

      return downloadURL;
    } catch (error) {
      console.log("Error is", error);
      setLoading(false);
      return null;
    }
  };

  //   useEffect(() => {
  //     if (image !== null) {
  //       // Call the uploadImage function only when the image state is updated

  //     }
  //     console.log("Current image:", image);
  //   }, [image]);

  // Update data in DB and in CONTEXT
  const handleCreatePost = async (
    setSuccess,
    setLoading,
    postTitle,
    postDescription,
    postTags,
    navigation
  ) => {
    setLoading(true);
    try {
      const downloadUrl = await uploadImage(setLoading);

      if (downloadUrl) {
        console.log("IMAGE URL ISSSSSSSSSSs", downloadUrl);

        const unsubscribe = await addDoc(
          collection(db, "allUsers", auth.currentUser?.uid, "userPosts"),
          {
            id: randomId, // Assuming randomId is defined somewhere
            postTitle: postTitle,
            postDescription: postDescription,
            postTags: postTags,
            PostImage: downloadUrl,
          }
        );

        setSuccess(true);
        console.log("Created Post");
        setLoading(false);
        navigation.navigate("Profile");

        return unsubscribe;
      }
    } catch (error) {
      setLoading(false);
      console.log("Post Creation Error: ", error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const userPostsCollectionRef = collection(
        db,
        "allUsers",
        auth.currentUser?.uid,
        "userPosts"
      );

      // Subscribe to real-time updates for posts of the current user
      const unsubscribe = onSnapshot(
        query(userPostsCollectionRef),
        (snapshot) => {
          const userPosts = [];
          snapshot.forEach((doc) => {
            userPosts.push({ id: doc.id, ...doc.data() });
          });
          // Set the fetched posts to setPosts array
          setPosts(userPosts);
          setPostCount(userPosts.length);
        },
        (error) => {
          console.error("Error fetching user posts:", error);
          throw error;
        }
      );

      // Return unsubscribe function to stop listening to updates
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching user posts:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return {
    pickImage,
    handleCreatePost,
    posts,
    image,
    setImage,
    postCount,
    fetchMyPosts,
  };
};

export default usePosts;
