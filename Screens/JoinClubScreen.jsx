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
  Car,
  Global,
  Heart,
  Location,
  People,
  SearchNormal,
  SearchNormal1,
  Star1,
  Timer1,
} from "iconsax-react-native";

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
            <SearchNormal size="24" color={"#101010"} variant={"Outline"} />
          </Pressable> */}
        </View>

        <View className="p-5">
          <View className="flex-row items-center">
            <TextInput
              //   onChangeText={(text) => setEmail(text)}
              //   value={email}
              placeholder="Search any club..."
              placeholderTextColor={`${
                activeInput === 1 ? "#101010" : "#c5c5c5"
              }`}
              className={`bg-[#101010] border border-[#FF26B9] w-full p-3 py-3 rounded-full text-[#f9f9f9] place text-lg overflow-hidden ${
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

          <View className="mt-2">
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
          className="py-1 border border-[#E9FA00] active:bg-[#101010] rounded-lg"
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
    <View className="w-80 rounded-[30px] overflow-hidden mx-2 bg-[#1c1b1b] pb-3 my-3">
      <ImageBackground
        source={require("../assets/Images/User/Dummy-Profile.png")}
        className="w-full h-36"
      >
        {/* Button to Save Card */}
        <Pressable
          className="bg-black/40 active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
          onPress={toggleSave}
        >
          <Heart
            size="24"
            color={isLiked ? "#FF26B9" : "#f9f9f9"}
            variant={isLiked ? "Bold" : "Outline"}
          />
        </Pressable>

        <View className="bg-black/40 flex-row justify-center items-center py-1 px-2 absolute top-3 rounded-lg left-5 space-x-1">
          <Text
            className="text-lg text-[#f9f9f9]"
            style={GlobalStyles.fontMedium}
          >
            4.5
          </Text>

          <Star1 size="14" color="#fff" variant="Bold" />
        </View>

        <View className="bg-[#101010]/50 w-full h-14 absolute bottom-0 justify-center items-center">
          <View className="w-full px-5">
            <View className="flex-row items-center space-x-2">
              <Timer1 size="24" color="#fff" variant="Bold" />

              <Text
                className="text-lg text-[#f9f9f9]"
                style={GlobalStyles.fontMedium}
              >
                Hello
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
      <View className="flex-col p-4 w-full z-10">
        <View className="flex-row justify-between items-center">
          {/* Location Name */}
          <Text
            className="text-2xl text-[#f9f9f9] max-w-[280px]"
            style={GlobalStyles.fontBold}
            numberOfLines={1}
          >
            Hello
          </Text>
        </View>

        {/* Time  */}

        <View className="flex-row items-center mt-2 space-x-1">
          <Car size={"18"} color="#FF26B9" variant="Bold" />
          <Text
            className="text-white text-base"
            style={GlobalStyles.fontRegular}
          >
            Hello
          </Text>
        </View>

        {/* Location  */}
        <View className="flex-row items-center mt-1 space-x-1">
          <Location size="18" color="#FF26B9" variant="Bold" />
          <Text
            className="text-base text-[#f9f9f9] max-w-[280px]"
            style={GlobalStyles.fontRegular}
            numberOfLines={1}
          >
            Hi
          </Text>
        </View>

        {/* Button  */}
        <Pressable
          className="p-2 mt-4 border border-[#E9FA00] active:bg-[#101010] rounded"
          onPress={() => navigation.navigate("GlobalDetails", {})}
        >
          <Text className="text-[#f9f9f9] text-center">View Details</Text>
        </Pressable>
      </View>
    </View>
  );
};
