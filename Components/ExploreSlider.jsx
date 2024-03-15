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
import { Demo1, Demo4, Demo5, Demo7, Demo8, Demo9 } from "../Utilities/Videos";

const ExploreSlider = () => {
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Data for carousel
  const carouselData = [
    {
      id: "01",
      video: Demo5,
      title: "Mazo",
      city: "Chennai",
      rating: "4.5",
      charges: "147",
    },
    {
      id: "02",
      video: Demo7,
      title: "Music Adda",
      city: "Chennai",
      rating: "4.2",
      charges: "245",
    },
    {
      id: "03",
      video: Demo9,
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
    return <ExploreDealsCard item={item} />;
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
  );
};

export default ExploreSlider;

const ExploreDealsCard = ({ item }) => {
  const videoRef = useRef();
  const [status, setStatus] = useState({});
  const [playbackInstance, setPlaybackInstance] = useState(null); // State to store the playback instance

  useEffect(() => {
    let shouldPlay = true; // Ensure shouldPlay is set to true initially

    const loadVideo = async () => {
      if (videoRef.current) {
        const instance = await videoRef.current.loadAsync();
        setPlaybackInstance(instance); // Store the playback instance in state
        shouldPlay && instance.playAsync(); // Start playback if shouldPlay is true
        instance.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
      }
    };

    const handlePlaybackStatusUpdate = (newStatus) => {
      setStatus(newStatus);
      if (newStatus.isLoaded && newStatus.isPlaying) {
        const { durationMillis, positionMillis } = newStatus;
        const remainingTime = durationMillis - positionMillis;
        if (remainingTime < 5000) {
          loadNextPortion();
        }
      }
    };

    const loadNextPortion = async () => {
      if (playbackInstance) {
        const { durationMillis, positionMillis } = status;
        const nextPosition = Math.min(positionMillis + 10000, durationMillis);
        await playbackInstance.setStatusAsync({ positionMillis: nextPosition });
      }
    };

    loadVideo();

    return () => {
      if (playbackInstance) {
        playbackInstance.unloadAsync(); // Unload the playback instance if it exists
      }
    };
  }, [item.video, playbackInstance]);

  return (
    <View className="w-screen">
      <View className="h-72 my-3 overflow-hidden w-screen mx-auto">
        <Video
          ref={videoRef}
          source={{ uri: item?.video }}
          isLooping
          shouldCorrectPitch={true}
          isMuted={true}
          shouldPlay
          resizeMode="cover"
          className=" h-72 my-3 overflow-hidden w-screen mx-auto absolute right-0 left-0 top-0 bottom-0 flex-1"
        />
        <View className="absolute top-3 right-5 bg-[#E9FA00] items-center justify-center px-3.5 py-1 z-50">
          <Text
            className="text-[#000000] text-xs"
            style={GlobalStyles.fontBold}
          >
            25% Off
          </Text>
        </View>

        <View className="bg-[#000000]/60 w-full h-14 absolute bottom-0 justify-center items-center">
          <View className="w-full px-5 pb-1">
            <View className="flex-row justify-between items-end">
              <Text
                className="text-xl text-[#f9f9f9]"
                style={GlobalStyles.fontBold}
              >
                {item?.title}
              </Text>
              {/* Rating  */}
              <View className="flex-row items-center">
                <Star1 size="18" color="#E9FA00" variant="Bold" />
                <Text
                  className="text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  {item?.rating}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Location size="18" color="#E9FA00" variant="Bold" />
                <Text
                  className="text-base text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  {item?.city}
                </Text>
              </View>

              <View className="flex-row">
                <Text className="text-[#f9f9f9]" style={GlobalStyles.fontBold}>
                  ₹{item?.charges}
                </Text>
                <Text
                  className="text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  /night
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
