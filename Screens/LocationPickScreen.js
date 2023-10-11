import React from "react";
import { View, Text, Pressable } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";

// ICONS
import { ArrowLeft } from "iconsax-react-native";
import AuthSparkle from "../assets/Illustrations/AuthSparkle.svg";

const LocationPickScreen = ({ navigation }) => {
  return (
    <View className="px-5 items-center h-screen justify-center text-center">
      <View className="absolute top-0 flex-row justify-between w-full items-center my-5">
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#f9f9f9" />
        </Pressable>
        <AuthSparkle width={64} height={64} />
      </View>
      <View className="">
        <Text
          className="text-white text-4xl text-center"
          style={GlobalStyles.fontBlack}
        >
          See What's On Near You
        </Text>
        <Text
          className="text-[#272727] text-lg text-center"
          style={GlobalStyles.fontMedium}
        >
          Pick an area!
        </Text>

        <View className="my-5 space-y-1">
          <Pressable className="bg-[#272727] w-full p-3 rounded-lg items-center">
            <Text
              className="text-[#f9f9f9] text-lg"
              style={GlobalStyles.fontMedium}
            >
              Use Current Location
            </Text>
          </Pressable>

          <Text
            className="text-[#F3EBD5] text-lg text-center"
            style={GlobalStyles.fontMedium}
            onPress={() => navigation.navigate("CitiesList")}
          >
            Choose Location!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LocationPickScreen;
