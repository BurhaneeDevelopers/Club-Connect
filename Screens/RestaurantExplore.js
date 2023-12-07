import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Clock,
  SearchNormal1,
  Add,
  Star1,
  Location,
  Heart,
  Gift,
} from "iconsax-react-native";
import { useState, useEffect } from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import axios from "axios";

// Components
import SectionTitles from "../Components/SectionTitles";
import HR from "../Components/HR";
import HotDealsSlider from "../Components/HotDealsSlider";
import client, { urlFor } from "../sanity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeaturedRow from "../Components/FeaturedRow";

const RestaurantExplore = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const TopFoodPicks = [
    {
      title: "Biriyani",
      image: "",
    },
    {
      title: "Chicken",
      image: "",
    },
    {
      title: "Paratha",
      image: "",
    },
    {
      title: "Pizza",
      image: "",
    },
    {
      title: "Shawarma",
      image: "",
    },
    {
      title: "Sandwich",
      image: "",
    },
    {
      title: "Idly",
      image: "",
    },
    {
      title: "Dosa",
      image: "",
    },
  ];

  // const [hotspotImages, setHotspotImages] = useState([]);
  // UNSPLASH_ACCESS_KEY = "6KEJery9EMaZFtuiQjELpzqV5sgo9vVWqm52b_gKYZ4";

  // const fetchHotspotImages = async () => {
  //   setLoading(true);
  //   try {
  //     // Generate a random query string to make the request unique
  //     const randomQuery = getRandomQuery(); // Define the getRandomQuery function

  //     const response = await axios.get(
  //       "https://api.unsplash.com/search/photos",
  //       {
  //         params: {
  //           query: randomQuery,
  //         },
  //         headers: {
  //           Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  //         },
  //       }
  //     );

  //     const images = response.data.results.map((result) => result.urls.regular);
  //     setHotspotImages(images);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching images from Unsplash:", error);
  //   }
  // };

  // const getRandomQuery = () => {
  //   const queries = ["beach", "mountain", "city", "forest", "desert"];
  //   const randomIndex = Math.floor(Math.random() * queries.length);
  //   return queries[randomIndex];
  // };

  // useEffect(() => {
  //   fetchHotspotImages();
  // }, []);

  // const HotspotCards = hotspotImages.map((image, index) => ({
  //   img: { uri: image },
  //   title: `Hotspot ${index + 1}`,
  //   location: "Unknown",
  //   price: "100",
  //   rating: "4.5",
  // }));

  const [featuredCategory, setFeaturedCategory] = useState([]);

  useEffect(() => {
    // Fetch Categories for restaurant like Top picks near you, Recommended for you!
    const fetchCategoriesForRestaurant = () => {
      try {
        client
          .fetch(
            `*[_type == "featured"]{
                ...,
                restaurants -> {
                }
              }
            `
          )
          .then((data) => {
            setFeaturedCategory(data);
            // console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoriesForRestaurant();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row w-full items-center p-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-3xl text-[#FF26B9] mx-auto"
            style={GlobalStyles.fontSemiBold}
          >
            Restaurant
          </Text>
        </View>

        <View className="p-5">
          <View
            className={`flex-row justify-between rounded-xl p-3 border border-[#FF26B9]  ${
              clicked ? "bg-[#FF26B9]" : ""
            }`}
          >
            <View className="flex-row items-center w-72 gap-2">
              {/* search Icon */}
              <SearchNormal1 size={28} color="#f9f9f9" />
              {/* Input field */}
              <TextInput
                placeholder="Search for any Restaurant!"
                // value={searchData}
                // onChangeText={(text) => {
                //   setSearchData(text);
                //   handleSearch(); // Call the search function
                // }}
                onFocus={() => {
                  setClicked(true);
                }}
                placeholderTextColor={"#f9f9f9"}
                className="text-lg w-full"
              />
            </View>

            {/* cross Icon, depending on whether the search bar is clicked or not */}
            {clicked && (
              <Add
                size={32}
                color="white"
                onPress={() => {
                  Keyboard.dismiss();
                  setClicked(false);
                  //   setSearchData("");
                }}
                className="rotate-45"
              />
            )}
          </View>
        </View>

        <View className="p-5">
          <SectionTitles title={"Quick Finds!"} />

          <View className="flex-row items-center justify-center space-x-5">
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Veg</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Non-Veg</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Starters</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Chinese</Text>
            </View>
          </View>
        </View>

        <View className="p-5">
          <SectionTitles title={"Top Picks For You!"} />

          <View className="flex-row items-center justify-center space-x-5 flex-wrap">
            {TopFoodPicks.map((item, index) => {
              return <TopPickCards title={item.title} key={index} />;
            })}
          </View>
        </View>

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <View className="p-5">
            <SectionTitles title={"Hot Deals Just For You!"} />
          </View>

          <HotDealsSlider />
        </View>

        {/* TOP HOTSPOTS CARDS  */}
        <View className="py-5">
          {/* COUPAN CARD  */}
          <CoupanCard />

          {featuredCategory?.map((category, index) => {
            return (
              <FeaturedRow
                key={category.id}
                id={category._id}
                title={category.name}
                navigation={navigation}
                featuredId={category.featuredId}
                dataType={"restaurants"}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantExplore;

const TopPickCards = ({ title }) => {
  return (
    <>
      <View className="items-center space-y-3 mx-3">
        <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
        <Text className="text-white">{title}</Text>
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
