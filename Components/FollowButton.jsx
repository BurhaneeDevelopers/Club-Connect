import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import useFollowStatus from "../Hooks/useFollowStatus";
import { getAuth } from "firebase/auth";
import useAuth from "../Hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import usePushNotification from "../Hooks/usePushNotification";

const FollowButton = ({ otherUserId, customClass, name }) => {
  const auth = getAuth();
  const { isFollowing, toggleFollowStatus, fetchFollowingStatus } =
    useFollowStatus(auth.currentUser.uid, otherUserId);
  const { expoPushToken, sendFollowNotification } = usePushNotification();

  useFocusEffect(
    React.useCallback(() => {
      fetchFollowingStatus();
    }, [])
  );

  const { user } = useAuth();

  const handleFollowToggle = async () => {
    toggleFollowStatus(otherUserId);
    if (!isFollowing) {
      await sendFollowNotification(expoPushToken, user?.name);
    }
  };
  return (
    <Pressable
      className={` ${
        isFollowing
          ? "bg-[#FF26B9] active:bg-[#FF26B9]/90"
          : "bg-[#E9FA00] active:bg-[#f7ff8c]"
      } ${customClass ? customClass : "px-3 py-2 rounded-lg mt-3"}`}
      onPress={handleFollowToggle}
    >
      <Text
        className={`text-center ${isFollowing ? "text-white" : "text-black"}`}
        style={GlobalStyles.fontSemiBold}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Text>
    </Pressable>
  );
};

export default FollowButton;
