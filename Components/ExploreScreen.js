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
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const animation = useRef(null);

  const handleAnimationFinish = () => {
    setAnimationPlayed(true);
  };

  useEffect(() => {
    // Check if the animation has already been played
    if (!animationPlayed) {
      AsyncStorage.getItem("playAnimation")
        .then((playAnimation) => {
          if (playAnimation === "true") {
            // Play the animation
            animation.current?.play();

            AsyncStorage.setItem("playAnimation", "false");
          }
        })
        .catch((error) => {
          console.error("Error checking AsyncStorage:", error);
        });
    }
  }, [animationPlayed]);

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
  return (
    <ScrollView>
      {!animationPlayed && (
        <LottieView
          ref={animation}
          loop={false}
          autoPlay={false}
          onAnimationFinish={handleAnimationFinish}
          className={`w-[700px] h-[1000px] absolute left-0 items-start justify-start top-0 -translate-x-20 ${
            !animationPlayed ? "" : ""
          }`}
          source={require("../assets/Illustrations/confetti.json")}
        />
      )}

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

        <View className="px-5 justify-center items-center">
          <View className="flex-row space-x-3 my-2">
            <Pressable
              className="bg-[#FF26B9] active:bg-[#bb3691] h-40 w-40 rounded-3xl p-5"
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                className="text-[#f9f9f9] text-2xl"
                style={GlobalStyles.fontBold}
              >
                Explore
              </Text>
              <Text className="text-gray-200" style={GlobalStyles.fontSemiBold}>
                Explore Nightlife with VHS
              </Text>
            </Pressable>

            <View className="bg-[#E9FA00] h-40 w-40 rounded-3xl p-5">
              <Text
                className="text-[#101010] text-2xl"
                style={GlobalStyles.fontBold}
              >
                VibeCity
              </Text>
              <Text className="text-gray-500" style={GlobalStyles.fontSemiBold}>
                Opportunities with Vibecity
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-3 my-2">
            <View className="bg-[#E9FA00] h-40 w-40 rounded-3xl p-5">
              <Text
                className="text-[#101010] text-2xl"
                style={GlobalStyles.fontBold}
              >
                Community
              </Text>
              <Text className="text-gray-500" style={GlobalStyles.fontSemiBold}>
                Be a part of the VHS community!
              </Text>
            </View>

            <View className="bg-[#FF26B9] active:bg-[#bb3691] h-40 w-40 rounded-3xl p-5">
              <Text
                className="text-[#f9f9f9] text-2xl"
                style={GlobalStyles.fontBold}
              >
                Wallet
              </Text>
              <Text className="text-gray-200" style={GlobalStyles.fontSemiBold}>
                Discounts and Coupans!
              </Text>
            </View>
          </View>
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
