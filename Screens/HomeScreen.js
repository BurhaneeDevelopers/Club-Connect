import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HotDealsSlider from "../Components/HotDealsSlider";
import {
  SearchNormal1,
  Buildings2,
  Coffee,
  Building,
  Shop,
  Location,
  Star1,
} from "iconsax-react-native";
import axios from "axios";

// Components
import SectionTitles from "../Components/SectionTitles";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import HotDealsSlider from "../Components/HotDealsSlider";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";

const HomeScreen = ({ navigation }) => {
  // Refresh API when user reloads
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   navigation.replace("Index");
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  // }, []);

  const [hotspotImages, setHotspotImages] = useState([]);
  UNSPLASH_ACCESS_KEY = "6KEJery9EMaZFtuiQjELpzqV5sgo9vVWqm52b_gKYZ4";

  const fetchHotspotImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: "resorts", // You can modify the query to match your requirements
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      const images = response.data.results.map((result) => result.urls.regular);
      setHotspotImages(images);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  useEffect(() => {
    fetchHotspotImages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHotspotImages();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const HotspotCards = hotspotImages.map((image, index) => ({
    img: { uri: image },
    title: `Hotspot ${index + 1}`,
    location: "Unknown",
    price: "100",
    rating: "4.5",
  }));

  useEffect(() => {
    const hasSignedIn = AsyncStorage.getItem("hasSignedIn");
    if (!hasSignedIn) {
      // Redirect to sign-in page if the user hasn't signed in
      // window.location.href = "/signin";
      navigation.navigate("SignIn");
    }
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className=""
    >
      <SafeAreaView className="h-full w-full">
        <View className="flex-row justify-between items-center p-5">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("../assets/Illustrations/Avatar.jpg")}
              className="w-16 rounded-full h-16"
            />

            <View className="">
              <Text
                className="text-xl text-[#FF26B9]"
                style={GlobalStyles.fontSemiBold}
              >
                Mohammed Jhansi
              </Text>
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
                Mohammed_jhansi72
              </Text>
            </View>
          </View>

          <View>
            <SearchNormal1 size="32" color="#E9FA00" variant="Broken" />
          </View>
        </View>

        <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="Top Hotspots" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row">
              {HotspotCards.map((item, index) => {
                return <TopPickCard key={index} {...item} />;
              })}
            </View>
            {loading && (
              <>
                {/* <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  className="w-40 h-64 rounded-[30px] overflow-hidden mx-2 bg-gray-100 animate-pulse"
                />
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  className="w-40 h-64 rounded-[30px] overflow-hidden mx-2 bg-gray-100 animate-pulse"
                />
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  className="w-40 h-64 rounded-[30px] overflow-hidden mx-2 bg-gray-100 animate-pulse"
                />
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  className="w-40 h-64 rounded-[30px] overflow-hidden mx-2 bg-gray-100 animate-pulse"
                /> */}
              </>
            )}
          </ScrollView>
        </View>

        <ScrollView
          horizontal={true}
          className="my-5"
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row pl-5">
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <MenuCards
                icon={<Buildings2 size="32" color="#f9f9f9" variant="Broken" />}
                title="Hotspot"
              />
            </Pressable>
            <MenuCards
              icon={<Coffee size="32" color="#f9f9f9" variant="Broken" />}
              title="Cafe"
            />
            <MenuCards
              icon={<Building size="32" color="#f9f9f9" variant="Broken" />}
              title="Bars"
            />
            <MenuCards
              icon={<Shop size="32" color="#f9f9f9" variant="Broken" />}
              title="Pubs"
            />
            <MenuCards
              icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
              title="Map"
            />
          </View>
        </ScrollView>

        <View className="p-5">
          <SectionTitles title="Hot Deals" />

          {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          </ScrollView> */}
            <HotDealsSlider />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const MenuCards = ({ icon, title }) => {
  return (
    <>
      <View className="bg-[#FF26B9] rounded-3xl w-24 h-24 justify-center items-center flex-col mx-2">
        {icon}
        <Text style={GlobalStyles.fontSemiBold} className="text-[#101010]">
          {title}
        </Text>
      </View>
    </>
  );
};

const TopPickCard = ({ title, img, location, price, rating }) => {
  return (
    <>
      <View>
        <ImageBackground
          source={img}
          className="w-40 h-64 rounded-[30px] overflow-hidden mx-2"
        >
          <View className="absolute bg-[#101010]/30 w-full h-full" />
          <View className="flex-col absolute bottom-5 px-4 w-full space-y-1 z-10">
            {/* Location Name */}
            <Text
              className="text-xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {title}
            </Text>
            {/* Location  */}
            <View className="flex-row items-center">
              <Location size="18" color="#f9f9f9" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
              >
                {location}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              {/* Price  */}
              <View className="flex-row items-center">
                <Text className="text-[#f9f9f9]" style={GlobalStyles.fontBold}>
                  ${price}
                </Text>
                <Text
                  className="text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  /night
                </Text>
              </View>
              {/* Rating  */}
              <View className="flex-row items-center">
                <Star1 size="18" color="#f9f9f9" variant="Bold" />
                <Text
                  className="text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  {rating}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const HotDealsCard = () => {
  return (
    <View className="">
      <ImageBackground
        source={require("../assets/Images/Santorini.jpg")}
        className="h-40 rounded-3xl my-4 overflow-hidden w-[340px] mx-2"
      >
        <View className="bg-[#101010]/40 w-full h-14 absolute bottom-0"></View>
        <View className="h-14 w-full px-5 absolute bottom-0">
          <View className="flex-row justify-between items-end">
            <Text
              className="text-xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              Santorini
            </Text>
            {/* Rating  */}
            <View className="flex-row items-center">
              <Star1 size="18" color="#f9f9f9" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                4.9
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Location size="18" color="#f9f9f9" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
              >
                Greece
              </Text>
            </View>

            <View className="flex-row">
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontBold}>
                $100
              </Text>
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                /night
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
