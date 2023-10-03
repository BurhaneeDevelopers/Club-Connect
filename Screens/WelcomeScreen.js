import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#262223] h-screen w-full justify-center items-center mx-auto p-10">
      <View className="items-center">
        <Image
          source={require("../assets/Illustrations/Sparkle.png")}
          className="w-[370px] h-[320.54px] mx-auto mb-20"
        />

        <View className="gap-2">
          <Text
            className="text-[#FFDFB9] text-4xl text-center"
            style={GlobalStyles.fontBold}
          >
            Explore the App
          </Text>
          <Text
            className="text-[#f9f9f9] w-72 text-center"
            style={GlobalStyles.fontRegular}
          >
            Your Nightlife is our responsibility and this is a random dummy
            text!
          </Text>
        </View>
      </View>

      <View className="gap-3 w-full mt-10">
        <Pressable className="w-full bg-[#D4AF37] p-3 rounded-lg items-center">
          <Text
            className="text-[#f9f9f9] text-lg"
            style={GlobalStyles.fontMedium}
          >
            Sign In
          </Text>
        </Pressable>
        <Pressable className="w-full border-[1.5px] border-[#FFDFB9] p-3 rounded-lg items-center">
          <Text
            className="text-[#D4AF37] text-lg"
            style={GlobalStyles.fontMedium}
          >
            Create Account
          </Text>
        </Pressable>
        <Pressable className="w-full p-3 rounded-lg items-center">
          <Text
            className="text-[#f9f9f9] text-lg"
            style={GlobalStyles.fontMedium}
          >
            Continue as Guest!
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
