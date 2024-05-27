import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Pressable,
  LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Star1, Location, ArrowLeft, SearchNormal, Heart } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import { Video } from "expo-av";
import { Demo1, Demo10, Demo4, Demo5, Demo6, Demo8 } from "../Utilities/Videos";

const GlobalDetailsSlider = () => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (carouselData) {
        const nextIndex = (activeIndex + 1) % carouselData.length; // Ensure it's within the valid range
        flatlistRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, carouselData]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  // Data for carousel
  const carouselData = [
    {
      id: "01",
      videos: Demo10,
      title: "VIP Bash Hosting",
      offer:
        "Elevate your event with our premium hosting services. Experience VIP treatment for a memorable celebration!",
    },
    {
      id: "02",
      videos: Demo8,
      title: "Seamless Event Solutions",
      offer:
        "Stress-free event hosting! From planning to execution, let us handle it all. Your perfect event starts here",
    },
    {
      id: "03",
      videos: Demo6,
      title: "Event Bliss Awaits!",
      offer:
        "Unlock the magic of flawless events. Join us for seamless hosting and create cherished memories effortlessly.",
    },
  ];

  //  Display Images // UI
  const renderItem = ({ item, index }) => {
    return (
      <View className="">
        <GlobalDetailsSliderCard videos={item?.videos} offer={item?.offer} />
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const totalContentWidth = carouselData.length * screenWidth;
    const centerOffset = contentOffset + screenWidth / 2;
    const centerIndex = Math.floor(
      (centerOffset / totalContentWidth) * carouselData.length
    );

    // Update the index
    setActiveIndex(centerIndex);
  };

  return (
    <View className="">
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GlobalDetailsSlider;

const GlobalDetailsSliderCard = ({ videos, offer, title }) => {
  // const screenWidth = Dimensions.get("window").width;

  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    video.current.playAsync();
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const toggleSave = () => {
    setIsLiked(!isLiked);
  };
  return (
    <Video
      ref={video}
      source={{ uri: videos }}
      isLooping
      shouldCorrectPitch={true}
      isMuted={true}
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      resizeMode="cover"
      className="w-screen h-80 rounded-b-[30px] overflow-hidden"
    >
      <View className="flex-row w-full  justify-between items-center p-5 bg-black/40">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute ml-5"
        >
          <ArrowLeft size="32" color="#f9f9f9" />
        </Pressable>

        <Text
          className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
          style={GlobalStyles.fontSemiBold}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Button to Save Cafe */}
        <Pressable
          className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
          onPress={toggleSave}
        >
          <Heart
            size="24"
            color={isLiked ? "#FF26B9" : "#000000"}
            variant={isLiked ? "Bold" : "Outline"}
          />
        </Pressable>
      </View>
    </Video>
  );
};
