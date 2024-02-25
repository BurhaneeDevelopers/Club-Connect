import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ExploreSlider from "../Components/ExploreSlider";
import {
  Gift,
  SearchNormal,
  ArrowLeft,
  BitcoinCard,
} from "iconsax-react-native";
// import { Video, ResizeMode } from "expo-av";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import SectionTitles from "../Components/SectionTitles";

const ExploreScreen = ({ navigation }) => {
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
      image: require("../assets/Illustrations/ExploreVibeCity.png"),
      color: "#E9FA00",
      redirectTo: "VibeCity",
      textColor: "#FF26B9",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Community",
      desc: "Be a part of VHS Community",
      image: require("../assets/Illustrations/Huge-Audience.png"),
      color: "#E9FA00",
      redirectTo: "Community",
      textColor: "#FF26B9",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
    {
      title: "Wallet",
      desc: "Discounts & Coupans!",
      image: require("../assets/Illustrations/ExploreWallet.png"),
      color: "#FF26B9",
      redirectTo: "Wallet",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
  ];

  // const video = useRef(null);
  // const [status, setStatus] = useState({});

  // useEffect(() => {
  //   video.current.playAsync();
  // }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        {/* MENU  */}
        <View className="flex-row w-full justify-between items-center p-5">
          <Pressable
            onPress={() => navigation.navigate("Subscription")}
            className="absolute ml-5"
          >
            <BitcoinCard size="28" color="#E9FA00" variant="Broken" />

            <View className="bg-[#FF26B9] p-1 absolute bottom-0 right-0 rounded-full border-2 border-[#101010]"></View>
          </Pressable>

          <Text
            className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
            style={GlobalStyles.fontSemiBold}
            numberOfLines={1}
          >
            Explore
          </Text>

          {/* Button to Save Cafe */}
          <Pressable className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-4 right-5">
            <SearchNormal size="24" color={"#101010"} variant={"Outline"} />
          </Pressable>
        </View>

        {/* AUTO SLIDING Banners  */}
        <View>
          <ExploreSlider />
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

        {/* <View className="p-10 justify-center items-center space-y-5">
          <SectionTitles title={"Explore All Options"} />
          <View className="flex-row space-x-5">
            <Video
              ref={video}
              source={require("../assets/Videos/Demo-1.mp4")}
              isLooping
              shouldCorrectPitch={true}
              isMuted={true}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              className="!w-1/2 !h-32 !rounded-xl"
            />

            <Video
              ref={video}
              source={require("../assets/Videos/Demo-2.mp4")}
              isLooping
              shouldCorrectPitch={true}
              isMuted={true}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              className="!w-1/2 !h-full !rounded-xl"
            />
          </View>

          <Video
            ref={video}
            source={{
              uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            }}
            isLooping
            shouldCorrectPitch={true}
            isMuted={true}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            className="!w-full !h-28 !rounded-xl"
          />
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
