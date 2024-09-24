import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import { TextInput } from "react-native";

const HugeAudienceScree = ({ navigation }) => {
  const animation = useRef();
  useEffect(() => {
    animation.current?.play();

    // Or set a specific startFrame and endFrame with:
    animation.current?.play(30, 120);
  }, []);

  // Active State for inputs
  const [activeInput, setActiveInput] = useState(0);

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const vhsfest = [
    {
      helpingText: "Your Full Name",
      placeholder: "Enter Your Full Name",
      inputNum: 1,
      type: "text",
    },
    {
      helpingText: "Your Phone Number",
      placeholder: "Enter Your Mobile Number",
      inputNum: 2,
      type: "text",
    },
    {
      helpingText: "Your Location",
      placeholder: "Enter Your Location",
      inputNum: 3,
      type: "text",
    },
    {
      helpingText: "Number of Guest Attending",
      placeholder: "Enter Number of Guest Estimated",
      inputNum: 4,
      type: "number",
    },
    {
      helpingText: "Date of Party",
      placeholder: "Enter Your Date of Event",
      inputNum: 5,
      type: "date",
    },
    {
      helpingText: "Offers",
      placeholder: "Enter any offer for you audience",
      inputNum: 6,
      type: "text",
    },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto"
    >
      <ScrollView className="">
        <View className="pb-20">
          <View className="flex-row w-full items-center p-5">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute ml-5"
            >
              <ArrowLeft size="32" color="#f9f9f9" />
            </Pressable>

            <Text
              className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
              style={GlobalStyles.fontSemiBold}
            >
              Huge Audience
            </Text>
          </View>

          {/* <View className="p-5">
            <View className="mb-8 justify-center items-center">
              <Image
                className="w-96 h-96"
                source={require("../assets/Illustrations/ComingSoon.png")}
              />
              <Text
                className="text-white text-3xl text-center"
                style={GlobalStyles.fontBold}
              >
                Hold Your Breath !
              </Text>
              <Text
                className="text-gray-200 w-64 text-center"
                style={GlobalStyles.fontMedium}
              >
                We are crafting a one stop solution for your city's hottest events, cafes,
                restaurants, and more 🚀✨
              </Text>
            </View>
          </View> */}

          <View className="p-5 gap-y-4">
            {vhsfest.map((item, i) => {
              return (
                <View key={i}>
                  <Text className="text-white mb-2">{item?.helpingText}</Text>
                  <TextInput
                    // onChangeText={(text) => setEmail(text)}
                    // value={email}
                    type={item?.type}
                    placeholder={item?.placeholder}
                    placeholderTextColor={`${
                      activeInput === item?.inputNum ? "#000000" : "#c5c5c5"
                    }`}
                    className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
                      activeInput === item?.inputNum
                        ? "bg-[#FF26B9] text-[#f9f9f9]"
                        : null
                    }`}
                    onBlur={handleInputBlur}
                    onFocus={() => handleInputFocus(item?.inputNum)}
                    style={GlobalStyles.fontMedium}
                  />
                </View>
              );
            })}
          </View>

          <View className="p-5">
            <View className="relative justify-center items-center w-full flex-row mb-2">
              <Text
                className="text-[#fff]/90 text-sm text-center mx-auto bg-[#000000] z-50"
                style={GlobalStyles.fontMedium}
              >
                The app is a part of beta testing. This feature will be
                available soon !
              </Text>
            </View>
            <Pressable
              // className={`w-full p-3 rounded-lg items-center bg-[#FF26B9] ${
              //   error ? "bg-[#FF26B9]/70" : ""
              // }`}
              // className="w-full p-3 rounded-lg items-center bg-[#FF26B9] active:bg-[#c52d95]"
              className="w-full p-3 rounded-lg items-center bg-[#FF26B9] opacity-40"
              // onPress={SignIn}
              disabled={true}
            >
              <Text className="text-[#f9f9f9] text-lg">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HugeAudienceScree;
