import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
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
  Bill,
  SearchNormal,
  Gps,
} from "iconsax-react-native";
import axios from "axios";
import Banner1 from "../assets/Banners/Banner-1.svg";
import HR from "../Components/HR";
import LottieView from "lottie-react-native";

// Contexts
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

// Components
import SectionTitles from "../Components/SectionTitles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import FeaturedHomeRow from "../Components/FeaturedHomerow";
import client from "../sanity";

// RN ELEMENTS
import { Skeleton } from "@rneui/themed";

const ExploreScreen = ({ navigation }) => {
  // FIRE CONFETTI when user signs In for the first Time anonymously
  // const animation = useRef();
  // Display Dummy Random UserName and Name when username not set
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the Name and UserName from AsyncStorage
    AsyncStorage.getItem("Name")
      .then((storedName) => {
        if (storedName) {
          setName(storedName);
        }
      })
      .catch((error) => {
        console.error("Error retrieving Name:", error);
      });

    AsyncStorage.getItem("UserName")
      .then((storedUserName) => {
        if (storedUserName) {
          setUserName(storedUserName);
        }
      })
      .catch((error) => {
        console.error("Error retrieving UserName:", error);
      });
  }, []);

  const { userDetails } = useContext(UserDetailsContext);

  // useEffect(() => {
  //   animation.current?.play();

  //   // Or set a specific startFrame and endFrame with:
  //   animation.current?.play(30, 120);
  // }, []);

  const RedirectCardData = [
    {
      title: "Explore",
      desc: "Explore Nightlife with VHS",
      image: require('../assets/Illustrations/PartyExplore.png'),
      color: "#FF26B9",
      redirectTo: "Home",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
    {
      title: "VibeCity",
      desc: "Opportunity with VibeCity",
      image: "",
      color: "#E9FA00",
      redirectTo: "VibeCity",
      textColor: "#101010",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Community",
      desc: "Be a part of VHS Community",
      image: "",
      color: "#E9FA00",
      redirectTo: "Community",
      textColor: "#101010",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Wallet",
      desc: "Discounts & Coupans!",
      image: "",
      color: "#FF26B9",
      redirectTo: "Wallet",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
  ];
  return (
    <ScrollView>
      <SafeAreaView>
        {/* MENU  */}
        <View className="flex-row justify-between items-center p-5">
          {/* USERNAME AND SEARCH MENU  */}
          <Pressable
            className="flex-row items-center space-x-2"
            onPress={() => navigation.navigate("Profile")}
          >
            {userDetails?.profileImage ? (
              <Image
                source={{ uri: userDetails.profileImage.uri }}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <Image
                source={require("../assets/Illustrations/Avatar.jpg")}
                className="w-16 h-16 rounded-full"
              />
            )}

            {/* {console.log(userDetails.profileImage)} */}

            <View className="">
              <Text
                className="text-xl text-[#FF26B9]"
                style={GlobalStyles.fontSemiBold}
              >
                {userDetails?.name || name || (
                  <Skeleton animation="pulse" width={140} height={10} />
                )}
                {/* {console.log(userDetails?.name)} */}
              </Text>
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
                {userDetails?.userName || userName || (
                  <Skeleton animation="pulse" width={120} height={10} />
                )}
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Setting")}>
            <SearchNormal1 size="32" color="#E9FA00" variant="Broken" />
          </Pressable>
        </View>

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <HotDealsSlider />
        </View>

        <View className="flex-row flex-wrap justify-center items-center">
          {RedirectCardData.map((item) => {
            return (
              <RedirectingCards
                navigation={navigation}
                title={item?.title}
                desc={item?.desc}
                image={item?.image}
                redirectTo={item?.redirectTo}
                color={item?.color}
                activeBgColor={item?.activeBgColor}
                textColor={item?.textColor}
                descColor={item?.descColor}
              />
            );
          })}
        </View>

        {/* COUPAN CARD  */}
        <CoupanCard />

        <View className="p-3">
          <View className="h-52 bg-gray-300 rounded-3xl p-5">
            <Text
              className="text-7xl py-1 mt-3 text-[#bb3691]"
              style={GlobalStyles.fontBlack}
            >
              Live It Up!
            </Text>

            <Text
              className="text-gray-700 text-xl"
              style={GlobalStyles.fontSemiBold}
            >
              Crafted with 💝 in Delhi, India
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ExploreScreen;

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

const RedirectingCards = ({
  navigation,
  redirectTo,
  image,
  title,
  desc,
  color,
  textColor,
  descColor,
  activeBgColor,
}) => {
  return (
    <Pressable
      className={`bg-[${color}] active:bg-[${activeBgColor}] h-40 w-44 rounded-3xl overflow-hidden p-5 m-2`}
      onPress={() => navigation.navigate(redirectTo)}
    >
      <Text
        className={`text-[${textColor}] text-2xl`}
        style={GlobalStyles.fontBold}
      >
        {title}
      </Text>
      <Text className={`text-[${descColor}]`} style={GlobalStyles.fontSemiBold}>
        {desc}
      </Text>

      {/* <LottieView
        ref={animation}
        autoPlay
        loop
        className="w-32 h-32 absolute right-0 top-0"
        source={require("../assets/Illustrations/ExploreParty.json")}
      /> */}

      <Image
        source={image }
        className="w-24 h-24 absolute -bottom-1 right-1"
      />
    </Pressable>
  );
};
