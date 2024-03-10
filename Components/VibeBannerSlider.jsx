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
import { Star1, Location, ArrowLeft, SearchNormal } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import { Video } from "expo-av";
import { Demo1, Demo4, Demo5, Demo6, Demo8 } from "../Utilities/Videos";

const VibeBannerSlider = () => {
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
      videos: Demo8,
      title: "VIP Bash Hosting",
      offer:
        "Elevate your event with our premium hosting services. Experience VIP treatment for a memorable celebration!",
    },
    {
      id: "02",
      videos: Demo5,
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
        <VibeBannerSliderCard
          videos={item?.videos}
          title={item?.title}
          offer={item?.offer}
        />
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

export default VibeBannerSlider;

const VibeBannerSliderCard = ({ videos, offer, title }) => {
  // const screenWidth = Dimensions.get("window").width;

  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    video.current.playAsync();
  }, []);
  return (
    <View className="w-screen">
      <Video
        ref={video}
        source={{ uri: videos }}
        isLooping
        shouldCorrectPitch={true}
        isMuted={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        resizeMode="cover"
        className="w-full h-80 items-start justify-center"
      >
        <View className="bg-black/40 absolute h-full w-full overflow-hidden z-40" />

        {/* <View className="p-5 absolute z-50">
          <Text className="text-white text-3xl" style={GlobalStyles.fontBold}>
            {title}
          </Text>

          <Text
            className="text-gray-200 w-52 text-lg"
            style={GlobalStyles.fontMedium}
          >
            {offer}
          </Text>
        </View> */}
      </Video>
    </View>
  );
};
