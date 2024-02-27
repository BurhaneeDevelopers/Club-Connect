import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import SectionTitles from "../Components/SectionTitles";
import {
  ArrowLeft,
  Global,
  Microphone2,
  People,
  SearchNormal,
} from "iconsax-react-native";

import Menu from "../assets/icons/Menu.svg";

const JoinClubScreen = ({ navigation }) => {
  // Active State for inputs
  const [activeInput, setActiveInput] = useState(0);

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex-row w-full justify-between items-center px-5 py-3">
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
            Join Clubs
          </Text>

          {/* Button to Save Cafe */}
          {/* <Pressable className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-4 right-5">
            <SearchNormal size="24" color={"#000000"} variant={"Outline"} />
          </Pressable> */}
        </View>

        <View className="p-5">
          <View className="flex-row items-center">
            <TextInput
              //   onChangeText={(text) => setEmail(text)}
              //   value={email}
              placeholder="Search any club..."
              placeholderTextColor={`${
                activeInput === 1 ? "#000000" : "#c5c5c5"
              }`}
              className={`bg-[#000000] border border-[#FF26B9] w-full p-3 py-3 rounded-full text-[#f9f9f9] place text-lg overflow-hidden ${
                activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              style={{
                shadowColor: "#FF26B9",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.21,
                shadowRadius: 8.19,
                elevation: 32,
              }}
            />

            <View className="absolute right-7">
              <SearchNormal size={24} color="#E9FA00" variant="Outline" />
            </View>
          </View>
        </View>

        <View className="p-5">
          <SectionTitles title="Explore Popular Clubs" />

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={true}
          >
            <View className="flex-row items-center overflow-hidden justify-center w-full mt-5">
              <PopularClubCard navigation={navigation} />
              <PopularClubCard navigation={navigation} />
              <PopularClubCard navigation={navigation} />
              <PopularClubCard navigation={navigation} />
            </View>
          </ScrollView>
        </View>

        <View className="p-5 justify-center items-center">
          <SectionTitles title="Explore Popular Clubs" />

          <View className="mt-2 w-full">
            <ExploreClubCard />
            <ExploreClubCard />
            <ExploreClubCard />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default JoinClubScreen;

const PopularClubCard = ({ navigation }) => {
  return (
    <View className="bg-[#262626] rounded-2xl w-64 p-3 flex-row space-x-4 mx-2 overflow-hidden">
      <View
        className="overflow-hidden rounded-xl w-20 h-20"
        style={{
          shadowColor: "#fff",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 18,
          // backgroundColor: "#0000",
        }}
      >
        <Image
          source={require("../assets/Images/User/Dummy-Profile.png")}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      <View className="">
        <Text
          className="text-[#f9f9f9] w-32 text-base"
          numberOfLines={1}
          style={GlobalStyles.fontSemiBold}
        >
          Aspirant Club
        </Text>

        {/* Rating  */}
        <View className="flex-row items-center space-x-2 my-2">
          <View className="flex-row items-center space-x-1">
            <Global size="18" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              Public
            </Text>
          </View>

          <Text className="text-gray-400 text-center">•</Text>

          <View className="flex-row items-center">
            <People size="16" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              432
            </Text>
          </View>
        </View>

        <Pressable
          className="py-1 border border-[#E9FA00] active:bg-[#000000] rounded-lg"
          onPress={() => navigation.navigate("GlobalDetails", {})}
        >
          <Text className="text-[#f9f9f9] text-center">View Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ExploreClubCard = ({}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleSave = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View className="w-full rounded-[30px] overflow-hidden bg-[#1c1b1b] p-3 my-3">
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row items-center space-x-2">
          <View className="flex-row items-center relative">
            <Image
              source={require("../assets/Images/User/Dummy-Profile.png")}
              className="w-10 h-10 rounded-full"
            />

            {/* Privacy Label  */}
            <View className="flex-row items-center space-x-1 mt-1 absolute bottom-0 right-0 bg-[#262626] rounded-full p-1">
              <Global size="12" color="#FF26B9" variant="Bold" />
            </View>
          </View>

          <View className="">
            <Text
              className="text-[#f9f9f9] text-lg"
              numberOfLines={1}
              style={GlobalStyles.fontSemiBold}
            >
              Aspirant Club
            </Text>

            <Text
              className="text-gray-400"
              numberOfLines={1}
              style={GlobalStyles.fontSemiBold}
            >
              Suresh Ponraj
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-2">
          <View className="bg-[#E9FA00] px-3 py-1 rounded-lg flex-row items-center space-x-2">
            <Text style={GlobalStyles.fontSemiBold} className="text-[#000000]">
              Voice
            </Text>
            <Microphone2 size="24" color="#FF26B9" variant="Bold" />
          </View>

          <Menu width={16} height={16} fill={"#f9f9f9"} />
        </View>
      </View>

      <View className="flex-row items-center justify-between mt-3">
        <View className="bg-[#E9FA00] p-2 w-40 h-32 rounded-xl">
          <View className="px-1">
            <Text className="text-[#FF26B9]" style={GlobalStyles.fontSemiBold}>
              Topic
            </Text>
            <Text
              className="text-[#000000] text-base"
              numberOfLines={2}
              style={GlobalStyles.fontSemiBold}
            >
              Hackathon GSP 2023
            </Text>
          </View>

          <View className="px-1">
            <Text className="text-[#FF26B9]" style={GlobalStyles.fontSemiBold}>
              Description
            </Text>
            <Text
              className="text-[#000000]"
              numberOfLines={2}
              style={GlobalStyles.fontMedium}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni,
              dolorum. Numquam, laboriosam provident sequi quam voluptate
              ducimus, quasi sunt debitis sed magni ut maxime animi impedit quis
              iure perspiciatis amet!
            </Text>
          </View>
        </View>
        <View className="bg-gray-700 p-2 w-40 h-32 rounded-xl"></View>
      </View>
    </View>
  );
};
