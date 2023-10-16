import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-[#101010] h-screen w-full justify-end items-center mx-auto p-10">
      <Image
        source={require("../assets/Illustrations/DiscoBall.png")}
        className="w-[300px] h-[337.5px] mx-auto mb-10 absolute top-0"
      />
      <View className="items-center">
        <View className="gap-2">
          <Text
            className="text-[#f9f9f9] text-4xl text-center"
            style={GlobalStyles.fontBold}
          >
            Let's Jump In!
          </Text>
          <Text
            className="text-[#f9f9f9] w-72 text-center"
            style={GlobalStyles.fontRegular}
          >
            Discover & Savor: Your Nightlife, Your Way! Create a account for
            free!
          </Text>
        </View>
      </View>

      <View className="gap-3 w-full mt-10">
        <Pressable
          className="w-full bg-[#FF26B9] active:bg-[#FF26B9]/70 p-3 rounded-lg items-center"
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            className="text-[#f9f9f9] text-lg"
            style={GlobalStyles.fontMedium}
          >
            Sign In
          </Text>
        </Pressable>
        <Pressable
          className="w-full border border-[#f9f9f9] active:bg-[#FF26B9]/10 p-3 rounded-lg items-center"
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text
            className="text-[#f9f9f9] active:text-black text-lg"
            style={GlobalStyles.fontMedium}
          >
            Create Account
          </Text>
        </Pressable>
        <Pressable
          className="w-full p-3 rounded-lg items-center"
          onPress={() => navigation.navigate("LocationPick")}
        >
          <Text
            className="text-[#FF26B9] text-lg"
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
