import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-[#867665] h-screen w-full justify-center items-center mx-auto p-10">
      <View className="items-center">
        <Image
          source={require("../assets/Illustrations/Glasses.png")}
          className="w-[346px] h-[249.67px] mx-auto mb-20"
        />

        <View className="gap-2">
          <Text
            className="text-[#272727] text-4xl text-center"
            style={GlobalStyles.fontBold}
          >
            Let's Jump In!
          </Text>
          <Text
            className="text-[#f9f9f9] w-72 text-center"
            style={GlobalStyles.fontRegular}
          >
            Discover & Savor: Your Nightlife, Your Way! Create a account for free!
          </Text>
        </View>
      </View>

      <View className="gap-3 w-full mt-10">
        <Pressable
          className="w-full bg-[#272727] active:bg-[#393939] p-3 rounded-lg items-center"
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
          className="w-full border border-[#EADAAA] active:bg-[#272727]/10 p-3 rounded-lg items-center"
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text
            className="text-[#272727] active:text-black text-lg"
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
