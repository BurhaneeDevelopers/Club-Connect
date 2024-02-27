import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import GlobalStyles from "../Styles/GlobalStyles";
import IntroSlider from "../Components/IntroSlider";

const IntroVideo = ({ navigation }) => {
  // const video = useRef(null);
  // const [status, setStatus] = useState({});

  // useEffect(() => {
  //   video.current.playAsync();
  // }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.navigate("Welcome"); // Redirect to "Welcome" screen after 5 seconds
  //   }, 5000);

  //   return () => clearTimeout(timer); // Clear the timer on component unmount
  // }, []);
  return (
    <View className="h-screen">
      {/* <Video
        ref={video}
        source={require("../assets/Videos/Demo-1.mp4")}
        isLooping
        shouldCorrectPitch={true}
        isMuted={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        resizeMode="cover"
        className="!h-screen w-screen"
      /> */}

      <IntroSlider />

      <Pressable
        className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center px-3 py-1 rounded absolute bottom-10 right-10"
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={GlobalStyles.fontSemiBold}>Skip...</Text>
      </Pressable>
    </View>
  );
};

export default IntroVideo;
