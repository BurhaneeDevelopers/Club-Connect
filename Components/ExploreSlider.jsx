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

const ExploreSlider = () => {
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
    length: screenWidth - 90,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  // Data for carousel
  const carouselData = [
    {
      id: "01",
      image: require("../assets/Images/Santorini.jpg"),
    },
    {
      id: "02",
      image: require("../assets/Images/VibeCity.png"),
    },
    {
      id: "03",
      image: require("../assets/Images/VibeCityTwo.jpeg"),
    },
  ];

  //  Display Images // UI
  const renderItem = ({ item, index }) => {
    return (
      <View className="">
        <ExploreDealsCard image={item?.image} />
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

export default ExploreSlider;

const ExploreDealsCard = ({ image }) => {
  return (
    <View className="w-screen">
      <ImageBackground
        source={image}
        className=" h-72 my-3 overflow-hidden w-screen mx-auto"
        // style={{ width: screenWidth }}
      >
        <View className="absolute top-3 right-5 bg-[#E9FA00] rounded-full items-center justify-center px-3.5 py-1 ">
          <Text
            className="text-[#101010] text-base"
            style={GlobalStyles.fontBold}
          >
            25% Off
          </Text>
        </View>

        <View className="bg-[#101010]/60 w-full h-14 absolute bottom-0 justify-center items-center">
          <View className="w-full px-5 pb-1">
            <View className="flex-row justify-between items-end">
              <Text
                className="text-xl text-[#f9f9f9]"
                style={GlobalStyles.fontBold}
              >
                Santorini
              </Text>
              {/* Rating  */}
              <View className="flex-row items-center">
                <Star1 size="18" color="#E9FA00" variant="Bold" />
                <Text
                  className="text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  4.9
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
                  Melbourne
                </Text>
              </View>

              <View className="flex-row">
                <Text className="text-[#f9f9f9]" style={GlobalStyles.fontBold}>
                  $100
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
      </ImageBackground>
    </View>
  );
};
