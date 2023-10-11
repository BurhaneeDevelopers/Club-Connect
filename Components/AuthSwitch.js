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
    <View className="w-full my-5 bg-[#EADAAA] py-1 rounded-xl flex-row items-center justify-between px-1">
      <Pressable
        className={`py-1 w-1/2 text-center rounded-lg  ${
          isCreateAccountActive ? "bg-[#272727] active:bg-[#393939]" : "active:bg-[#f7d0a0]"
        }`}
        onPress={() => {
          handleButtonPress(1);
        }}
      >
        <Text
          className={`text-lg text-center ${
            isCreateAccountActive ? "text-white" : ""
          }`}
        >
          Sign Up
        </Text>
      </Pressable>

      <Pressable
        className={`py-1 w-1/2 text-center rounded-lg  ${
          isSignInActive ? "bg-[#272727] active:bg-[#393939]" : "active:bg-[#f7d0a0]"
        }`}
        onPress={() => {
          handleButtonPress(2);
        }}
      >
        <Text
          className={`text-lg text-center ${
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
