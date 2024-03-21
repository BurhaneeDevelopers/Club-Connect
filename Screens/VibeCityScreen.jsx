import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Location, Gift, ArrowLeft, SearchNormal } from "iconsax-react-native";
import { Video } from "expo-av";

// Components
import SectionTitles from "../Components/SectionTitles";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import VibeBannerSlider from "../Components/VibeBannerSlider";

// SANITY
// import client from "../sanity";

// RN ELEMENTS
// import VibeBannerSlider from "../Components/VibeBannerSlider";

const VibeCityScreen = ({ navigation }) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleSave = () => {
    setIsLiked(!isLiked);
  };

  const VibeBannerData = [
    {
      title: "Host With Us",
      desc: "Events Elevated, Effortlessly Executed!",
      image: require("../assets/Illustrations/HostWithUs.png"),
      color: "#FF26B9",
      redirectTo: "HostWithUs",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
    {
      title: "VHS Fest",
      desc: "Thrilling Moments Awaits You!",
      image: require("../assets/Illustrations/VibeCity.png"),
      color: "#E9FA00",
      redirectTo: "VhsFest",
      textColor: "#000000",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Huge Audience",
      desc: "Book your dates and events for bigger audiences",
      image: require("../assets/Illustrations/Huge-Audience.png"),
      color: "#E9FA00",
      redirectTo: "HugeAudience",
      textColor: "#000000",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Invite Vibers",
      desc: "Post your party! Invite your friends, family & VIPS",
      image: require("../assets/Illustrations/Invite-Vibers.png"),
      color: "#FF26B9",
      redirectTo: "InviteVibers",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
  ];

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView>
        <View
          className="rounded-b-[50px] overflow-hidden"
          style={{
            shadowColor: "#FF26B9",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.31,
            shadowRadius: 10,
            elevation: 10,
          }}
        >
          <View className="flex-row w-full  justify-between items-center p-5 absolute z-50">
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
              Vibecity
            </Text>

            {/* Button to Save Cafe */}
            <Pressable
              className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
              onPress={toggleSave}
            >
              <SearchNormal
                size="24"
                color={isLiked ? "#FF26B9" : "#000000"}
                variant={isLiked ? "Bold" : "Outline"}
              />
            </Pressable>
          </View>

          {/* <VibeBannerSlider /> */}
        </View>

        <View className="p-5 justify-center items-center">
          <SectionTitles title="Grab Opportunities!" />
        </View>

        <View className="flex-row flex-wrap justify-center items-center">
          {VibeBannerData.map((item, index) => {
            // Assuming RedirectCardData has even length. To always keep 2 in one row
            if (index % 2 === 0) {
              return (
                <View key={index / 2} className="flex-row">
                  <ServicesCard
                    navigation={navigation}
                    title={VibeBannerData[index].title}
                    desc={VibeBannerData[index].desc}
                    image={VibeBannerData[index].image}
                    redirectTo={VibeBannerData[index].redirectTo}
                    color={VibeBannerData[index].color}
                    activeBgColor={VibeBannerData[index].activeBgColor}
                    textColor={VibeBannerData[index].textColor}
                    descColor={VibeBannerData[index].descColor}
                  />
                  {index + 1 < VibeBannerData.length && (
                    <ServicesCard
                      navigation={navigation}
                      title={VibeBannerData[index + 1].title}
                      desc={VibeBannerData[index + 1].desc}
                      image={VibeBannerData[index + 1].image}
                      redirectTo={VibeBannerData[index + 1].redirectTo}
                      color={VibeBannerData[index + 1].color}
                      activeBgColor={VibeBannerData[index + 1].activeBgColor}
                      textColor={VibeBannerData[index + 1].textColor}
                      descColor={VibeBannerData[index + 1].descColor}
                    />
                  )}
                </View>
              );
            }
            return null;
          })}
        </View>

        {/* COUPAN CARD  */}
        {/* <CoupanCard /> */}

        {/* <View className="mb-5 px-5">
          <View className="mb-3">
            <SectionTitles title={"Explore Other VIBERS"} />
          </View>

          <VibersCard />
          <VibersCard />
          <VibersCard />
          <VibersCard />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VibeCityScreen;

const ServicesCard = ({
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
      className={`bg-[${color}] active:bg-[${activeBgColor}] h-48 w-44 rounded-3xl overflow-hidden py-4 px-1 m-2`}
      onPress={() => navigation.navigate(redirectTo)}
    >
      <Text
        className={`text-[${textColor}] text-xl text-center`}
        style={GlobalStyles.fontBold}
      >
        {title}
      </Text>
      <Text
        className={`text-[${descColor}] text-center text-xs`}
        style={GlobalStyles.fontSemiBold}
      >
        {desc}
      </Text>

      {/* <LottieView
        ref={animation}
        autoPlay
        loop
        className="w-32 h-32 absolute right-0 top-0"
        source={require("../assets/Illustrations/ExploreParty.json")}
      /> */}

      <View className="px-4">
        <Image source={image} className="w-full h-24 mx-auto mt-4" />
      </View>
    </Pressable>
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

const VibersCard = () => {
  return (
    <View className="flex-row items-center space-x-4 px-3 bg-[#FF26B9] rounded-xl h-28 w-full my-2">
      <View
        className="overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 32,
        }}
      >
        <Image
          source={require("../assets/Images/Santorini.jpg")}
          className="w-20 h-20 rounded-lg"
        />
      </View>
      <View className="">
        <Text
          className="text-base text-[#000000] w-56"
          style={GlobalStyles.fontBold}
        >
          Dance party at the top of the town - 2022
        </Text>

        <View className=" space-x-24 flex-row  items-center">
          <View className="space-x-1 flex-row items-center">
            <Location size="18" color="#000000" variant="Bold" />
            <Text
              className="text-[#000000] text-base"
              style={GlobalStyles.fontMedium}
            >
              Greece
            </Text>
          </View>

          <View className="bg-[#E9FA00] px-5 py-1.5 rounded-lg justify-center items-center">
            <Pressable>
              <Text
                className="text-base text-[#000000]"
                style={GlobalStyles.fontBold}
              >
                Book
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
