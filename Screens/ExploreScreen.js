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
  ArrowLeft,
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
  // const [name, setName] = useState("");
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   // Retrieve the Name and UserName from AsyncStorage
  //   AsyncStorage.getItem("Name")
  //     .then((storedName) => {
  //       if (storedName) {
  //         setName(storedName);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving Name:", error);
  //     });

  //   AsyncStorage.getItem("UserName")
  //     .then((storedUserName) => {
  //       if (storedUserName) {
  //         setUserName(storedUserName);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving UserName:", error);
  //     });
  // }, []);

  // const { userDetails } = useContext(UserDetailsContext);

  // useEffect(() => {
  //   animation.current?.play();

  //   // Or set a specific startFrame and endFrame with:
  //   animation.current?.play(30, 120);
  // }, []);

  const RedirectCardData = [
    {
      title: "Explore",
      desc: "Explore Nightlife with VHS",
      image: require("../assets/Illustrations/PartyExplore.png"),
      color: "#FF26B9",
      redirectTo: "Index",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
    {
      title: "Vibecity",
      desc: "Opportunity with VibeCity",
      image: "",
      color: "#E9FA00",
      redirectTo: "VibeCity",
      textColor: "#FF26B9",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Community",
      desc: "Be a part of VHS Community",
      image: "",
      color: "#E9FA00",
      redirectTo: "Community",
      textColor: "#FF26B9",
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

  const [isLiked, setIsLiked] = useState(false);
  const toggleSave = () => {
    setIsLiked(!isLiked);
  };
  return (
    <ScrollView>
      <SafeAreaView>
        {/* MENU  */}
        <View className="flex-row w-full  justify-between items-center p-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
            style={GlobalStyles.fontSemiBold}
            numberOfLines={1}
          >
            Explore
          </Text>

          {/* Button to Save Cafe */}
          <Pressable
            className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
            onPress={toggleSave}
          >
            <SearchNormal
              size="24"
              color={isLiked ? "#FF26B9" : "#101010"}
              variant={isLiked ? "Bold" : "Outline"}
            />
          </Pressable>
        </View>

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <HotDealsSlider />
        </View>

        <View className="flex-row flex-wrap justify-center items-center">
          {RedirectCardData.map((item, index) => {
            return (
              <RedirectingCards
                key={index}
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
        {/* <CoupanCard /> */}

        {/* <View className="p-3">
          <View className=" h-52 bg-gray-300 rounded-3xl p-5">
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
              Crafted with 💝 in Chennai, India
            </Text>
          </View>
        </View> */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ExploreScreen;

const CoupanCard = () => {
  return (
    <View className="p-5">
      <View className="bg-[#262223] h-24 rounded-2xl w-full p-5">
        <View className="flex-row gap-4 items-center">
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
      className={`bg-[${color}] active:bg-[${activeBgColor}] h-40 w-44 rounded-3xl overflow-hidden p-4 m-2`}
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

      <Image source={image} className="w-24 h-24 absolute -bottom-1 right-1" />
    </Pressable>
  );
};
