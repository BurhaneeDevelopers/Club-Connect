import React from "react";
import { View, Text, Pressable } from "react-native";
import { useState } from "react";

const AuthSwitch = ({ navigation, route }) => {
  const isCreateAccountActive = route.name === "CreateAccount";
  const isSignInActive = route.name === "SignIn";

  const handleButtonPress = (buttonNumber) => {
    if (buttonNumber === 1 && !isCreateAccountActive) {
      navigation.navigate("CreateAccount");
    } else if (buttonNumber === 2 && !isSignInActive) {
      navigation.navigate("SignIn");
    }
  };

  return (
    <View className="w-full my-5 border border-[#FF26B9] py-1 rounded-xl flex-row items-center justify-between px-1">
      <Pressable
        className={`py-1 w-1/2 text-center rounded-lg  ${
          isCreateAccountActive
            ? "bg-[#FF26B9]"
            : "active:bg-[#FF26B9]/10"
        }`}
        onPress={() => {
          handleButtonPress(1);
        }}
      >
        <Text
          className={`text-lg text-center text-[#f9f9f9] ${
            isCreateAccountActive ? "text-white" : ""
          }`}
        >
          Sign Up
        </Text>
      </Pressable>

      <Pressable
        className={`py-1 w-1/2 text-center rounded-lg  ${
          isSignInActive
            ? "bg-[#FF26B9]"
            : "active:bg-[#FF26B9]/10"
        }`}
        onPress={() => {
          handleButtonPress(2);
        }}
      >
        <Text
          className={`text-lg text-center text-white ${
            isSignInActive ? "text-white font-semibold" : ""
          }`}
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthSwitch;
