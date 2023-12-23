import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, getAuth } from "../firebase";

const useFollowStatus = (currentUserId, otherUserId) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const auth = getAuth();
  // Function to follow a user
  const followUser = async (userIdToFollow) => {
    const currentUserRef = doc(db, "allUsers", auth.currentUser.uid);
    const otherUserRef = doc(db, "allUsers", userIdToFollow);

    // Add the other user to the current user's following list
    await updateDoc(currentUserRef, {
      following: arrayUnion(userIdToFollow),
    });

    // Add the current user to the other user's followers list
    await updateDoc(otherUserRef, {
      followers: arrayUnion(auth.currentUser.uid),
    });
  };

  // Function to unfollow a user
  const unfollowUser = async (userIdToUnfollow) => {
    const currentUserRef = doc(db, "allUsers", auth.currentUser.uid);
    const otherUserRef = doc(db, "allUsers", userIdToUnfollow);

    // Remove the other user from the current user's following list
    await updateDoc(currentUserRef, {
      following: arrayRemove(userIdToUnfollow),
    });

    // Remove the current user from the other user's followers list
    await updateDoc(otherUserRef, {
      followers: arrayRemove(auth.currentUser.uid),
    });
  };

  // Fetch the current user's following list on mount
  const fetchFollowingStatus = async () => {
    // Fetch the current user's data
    const currentUserRef = doc(db, "allUsers", currentUserId);
    const currentUserData = await getDoc(currentUserRef);
    const followingList = currentUserData.data().following;

    // Check if the other user is in the following list
    const isFollowing = followingList.includes(otherUserId);
    setIsFollowing(isFollowing);
  };

  useEffect(() => {
    fetchFollowingStatus();
  }, [currentUserId, otherUserId, isFollowing]);

  // Function to toggle follow/unfollow
  const toggleFollowStatus = async () => {
    if (isFollowing) {
      // Unfollow the user
      await unfollowUser(otherUserId);
    } else {
      // Follow the user
      await followUser(otherUserId);
    }

    // Update the local state
    setIsFollowing(!isFollowing);
  };

  return { isFollowing, toggleFollowStatus, fetchFollowingStatus };
};

export default useFollowStatus;
