import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const hasSignedIn = AsyncStorage.getItem("hasSignedIn");
    if (!hasSignedIn) {
      // Redirect to sign-in page if the user hasn't signed in
      // window.location.href = "/signin";
      navigation.navigate("Index");
    }
  }, [navigation]);

  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <SafeAreaView className="bg-[#101010] h-screen w-full justify-end items-center mx-auto p-10">
      <View className="mb-10 ">
        {/* <Image
          source={require("../assets/Illustrations/CreateAccount.png")}
          className="w-96 h-64"
        /> */}
        <LottieView
          ref={animation}
          className="w-full"
          source={require("../assets/Illustrations/Dancing-Bunnies.json")}
        />
      </View>

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
