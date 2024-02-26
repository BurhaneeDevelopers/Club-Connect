import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";

const IntroVideo = ({ navigation }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    video.current.playAsync();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome"); // Redirect to "Welcome" screen after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);
  return (
    <Video
      ref={video}
      source={require("../assets/Videos/Demo-1.mp4")}
      isLooping
      shouldCorrectPitch={true}
      isMuted={true}
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      className="h-screen w-screen"
    />
  );
};

export default IntroVideo;
