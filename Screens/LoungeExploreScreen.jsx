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
import client from "../sanity";
import FeaturedRow from "../Components/FeaturedRow";

const LoungeExploreScreen = ({ navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const TopFoodPicks = [
    {
      title: "Mocha",
      image: "",
    },
    {
      title: "Late",
      image: "",
    },
    {
      title: "Coffee",
      image: "",
    },
    {
      title: "Chocolate",
      image: "",
    },
    {
      title: "Brownie",
      image: "",
    },
    {
      title: "Hot Coffee",
      image: "",
    },
    {
      title: "Milk Shake",
      image: "",
    },
    {
      title: "Malai Milk",
      image: "",
    },
  ];

  const [featuredCategory, setFeaturedCategory] = useState([]);

  useEffect(() => {
    // Fetch Categories for restaurant like Top picks near you, Recommended for you!
    const fetchCategoriesForLounges = () => {
      try {
        client
          .fetch(
            `*[_type == "featured"]{
                  ...,
                  lounge -> {
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

    fetchCategoriesForLounges();
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
            Lounge
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
                placeholder="Search for any Lounge!"
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

              {/* {console.log(searchData)} */}
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

        {/* <View className="p-5">
          <SectionTitles title={"Quick Finds!"} />

          <View className="flex-row items-center justify-center space-x-5">
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Tea</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Coffee</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Starters</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Quick Eats</Text>
            </View>
          </View>
        </View> */}

        {/* <View className="p-5">
          <SectionTitles title={"Top Picks For You!"} />

          <View className="flex-row items-center justify-center space-x-5 flex-wrap">
            {TopFoodPicks.map((item, index) => {
              return <TopPickCards title={item.title} key={index} />;
            })}
          </View>
        </View> */}

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <View className="p-5">
            <SectionTitles title={"Hot Deals Just For You!"} />
          </View>

          <HotDealsSlider />
        </View>

        <View className="">
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
                dataType={"lounges"}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoungeExploreScreen;

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
