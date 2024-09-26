import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const useFollowStatus = (currentUserId, otherUserId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

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

  // Function to fetch followers for a user
  const fetchFollowers = async (userId) => {
    const userRef = doc(db, "allUsers", userId);
    const userData = await getDoc(userRef);
    const followersList = userData.data().followers || [];

    const followersDetails = await Promise.all(
      followersList.map(async (followerId) => {
        const followerRef = doc(db, "allUsers", followerId);
        const followerData = await getDoc(followerRef);
        return followerData.data();
      })
    );

    const sortedFollowers = followersDetails.slice().sort((a, b) => {
      if (a.uid === currentUserId) {
        return -1;
      } else if (b.uid === currentUserId) {
        return 1;
      } else {
        return 0;
      }
    });

    setFollowers(sortedFollowers);
  };

  // Function to fetch following for a user
  const fetchFollowing = async (userId) => {
    const userRef = doc(db, "allUsers", userId);
    const userData = await getDoc(userRef);
    const followingList = userData.data().following || [];

    const followingDetails = await Promise.all(
      followingList.map(async (followingId) => {
        const followingRef = doc(db, "allUsers", followingId);
        const followingData = await getDoc(followingRef);
        return followingData.data();
      })
    );

    const sortedFollowing = followingDetails.slice().sort((a, b) => {
      if (a.uid === currentUserId) {
        return -1;
      } else if (b.uid === currentUserId) {
        return 1;
      } else {
        return 0;
      }
    });

    setFollowing(sortedFollowing);
  };

  // Fetch the current user's following list on mount
  const fetchFollowingStatus = async () => {
    // Fetch the current user's data
    const currentUserRef = doc(db, "allUsers", currentUserId);
    const currentUserData = await getDoc(currentUserRef);
    const followingList = currentUserData.data().following || {};

    // Check if the other user is in the following list
    const isFollowing = followingList.includes(otherUserId);
    setIsFollowing(isFollowing);

    await fetchFollowers(otherUserId);
    await fetchFollowing(otherUserId);
  };

  useEffect(() => {
    fetchFollowingStatus();
  }, [currentUserId, otherUserId, isFollowing]);

  // Function to toggle follow/unfollow
  const toggleFollowStatus = async () => {
    // Update the local state
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      // Unfollow the user
      await unfollowUser(otherUserId);
    } else {
      // Follow the user
      await followUser(otherUserId);
    }
  };

  return {
    isFollowing,
    toggleFollowStatus,
    fetchFollowingStatus,
    followers,
    following,
  };
};

export default useFollowStatus;
