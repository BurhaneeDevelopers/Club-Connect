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
import { Star1, Location } from "iconsax-react-native";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";

const IntroSlider = () => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Data for carousel
  const carouselData = [
    {
      id: "01",
      video: require("../assets/Videos/Demo-4.mp4"),
      title: "Mazo",
      city: "Chennai",
      rating: "4.5",
      charges: "147",
    },
    {
      id: "02",
      video: require("../assets/Videos/Demo-5.mp4"),
      title: "Music Adda",
      city: "Chennai",
      rating: "4.2",
      charges: "245",
    },
    {
      id: "03",
      video: require("../assets/Videos/Demo-1.mp4"),
      title: "Tea Time",
      city: "Chennai",
      rating: "5",
      charges: "50",
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

  useEffect(() => {
    const downloadVideo = async () => {
      const videoIndex = item?.video; // Assuming it's an index
      const videoUri = carouselData[videoIndex]?.video; // Retrieve URI from carouselData
      const fileUri = FileSystem.cacheDirectory + "cachedVideo.mp4";

      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          await FileSystem.downloadAsync(videoUri, fileUri);
        }
        setStatus({ uri: fileUri });
      } catch (error) {
        console.error("Error downloading video:", error);
      }
    };

    downloadVideo();

    return () => {
      // Clean up any resources if needed
    };
  }, [item?.video]);
  return (
    <View className="h-screen w-screen">
      <Video
        ref={video}
        source={item?.video}
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
