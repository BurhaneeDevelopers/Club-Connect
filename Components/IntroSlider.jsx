import { FlatList, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import { Demo4 } from "../Utilities/Videos";

const IntroSlider = () => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Data for carousel
  const carouselData = [
    {
      id: "01",
      video: Demo4,
    },
  ];

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
    length: screenWidth - 90,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  //  Display Images // UI
  const renderItem = ({ item, index }) => {
    return (
      <View className="">
        <ExploreDealsCard item={item} />
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

export default IntroSlider;

const ExploreDealsCard = ({ item }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    video.current.playAsync();
  }, []);

  return (
    <View className="h-screen w-screen">
      <Video
        ref={video}
        source={{ uri: item?.video }}
        isLooping
        shouldCorrectPitch={true}
        isMuted={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        resizeMode="cover"
        className=" h-screen overflow-hidden w-screen"
      />
    </View>
  );
};
