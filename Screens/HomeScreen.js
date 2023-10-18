import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
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
  Gift,
} from "iconsax-react-native";
import axios from "axios";
import Banner1 from "../assets/Banners/Banner-1.svg";
import HR from "../Components/HR";

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
      setLoading(false);
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
          {/* USERNAME AND SEARCH MENU  */}
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

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <HotDealsSlider />
        </View>

        {/* MENU CARDS  */}
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

        {/* TOP HOTSPOTS CARDS  */}
        <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="Top Hotspots" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row items-center justify-center">
              {HotspotCards.map((item, index) => {
                return <TopPickCard key={index} {...item} />;
              })}
              {loading && <ActivityIndicator size="32" color="#E9FA00" />}
            </View>
          </ScrollView>
        </View>

        {/* COUPAN CARD  */}
        <CoupanCard />

        {/* TOP HOTSPOTS CARDS  */}
        <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="Top Picks Near You!" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row items-center justify-center">
              {HotspotCards.map((item, index) => {
                return <NearestPickCard key={index} {...item} />;
              })}
              {loading && <ActivityIndicator size="32" color="#E9FA00" />}
            </View>
          </ScrollView>
        </View>

        <View className="justify-center items-center p-5">
          <Banner1 width={320} height={60} />
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

const CoupanCard = () => {
  return (
    <View className="p-5">
      <View className="bg-[#262223] h-24 rounded-2xl w-full p-5">
        <View className="flex-row gap-2 items-center">
          {/* ICON GIFT  */}
          <View className="bg-[#FF26B9] p-2 rounded-xl">
            <Gift size="44" color="#E9FA00" />
          </View>

          {/* OFFER CONTENT  */}
          <View className="">
            <Text
              className="text-[#E9FA00] text-2xl"
              style={GlobalStyles.fontSemiBold}
            >
              CLAIM
              <Text className="text-[#FF26B9]"> FREE </Text>
              PESO!
            </Text>
            <Text
              className="text-[#f9f9f9] text-xs w-64"
              style={GlobalStyles.fontRegular}
            >
              Share the app and win your 100 peso in your wallet!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const NearestPickCard = ({ title, img, location, price, rating }) => {
  return (
    <>
      <View>
        <View className="w-72 h-72 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <Image source={img} className="w-full h-32" />
          {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
          <View className="flex-col p-4 w-full space-y-1 z-10">
            <View className="flex-row justify-between items-center">
              {/* Location Name */}
              <Text
                className="text-2xl text-[#f9f9f9]"
                style={GlobalStyles.fontBold}
              >
                {title}
              </Text>

              <View className="flex-row justify-between items-center">
                {/* Price  */}
                <View className="flex-row items-center">
                  <Text
                    className="text-[#f9f9f9] text-xl"
                    style={GlobalStyles.fontBold}
                  >
                    ${price}
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

            {/* Rating  */}
            <View className="flex-row items-center">
              <Star1 size="18" color="#E9FA00" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                {rating}
              </Text>
            </View>

            {/* Location  */}
            <View className="flex-row items-center">
              <Location size="18" color="#E9FA00" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
              >
                {location}
              </Text>
            </View>

            <HR customClass={"bg-[#f9f9f9] mt-3 mb-1"} />

            <View>
              <Text
                className="text-gray-400 text-xs"
                style={GlobalStyles.fontRegular}
              >
                Follows all safety measures for a clean and hygiene food
                experience
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
