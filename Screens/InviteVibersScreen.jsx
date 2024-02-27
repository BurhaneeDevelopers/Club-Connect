import {
    View,
    ScrollView,
    Text,
    Pressable,
    Image,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { useEffect, useRef } from "react";
  import { ArrowLeft } from "iconsax-react-native";
  import GlobalStyles from "../Styles/GlobalStyles";
  

  import Im from "../assets/Illustrations/rafiki3.svg";

const InviteVibersScreen = ({ navigation }) => {
    const animation = useRef();
    useEffect(() => {
      animation.current?.play();
  
      // Or set a specific startFrame and endFrame with:
      animation.current?.play(30, 120);
    }, []);
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
    className="h-screen w-screen items-center justify-center mx-auto"
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
            Invite Vibers
          </Text>
        </View>

        <View className="relative justify-center items-center w-full flex-row pt-7">
          <Text
            className="text-[#fff]/90 text-sm text-center mx-auto bg-[#000000] px-2.5 z-50"
            style={GlobalStyles.fontMedium}
          >
            The app is a part of beta testing. Available Soon !
          </Text>
        </View>

        <View className="p-5">
          <View className="mb-8 justify-center items-center">
            <Im width={400} height={400} />
            <Text
              className="text-white text-3xl text-center"
              style={GlobalStyles.fontBold}
            >
              Available soon !
            </Text>
            <Text
              className="text-gray-200 w-64 text-center"
              style={GlobalStyles.fontMedium}
            >
              We are also available for professional and large scale meetings.
            </Text>
          </View>
        </View>

        {/* <View className="p-5">
            <View className="mb-3">
              <SectionTitles title={"Explore Hotspots and Cafe!"} />
            </View>

            <SavedCards />
            <SavedCards />
            <SavedCards />
            <SavedCards />
          </View> */}
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  )
}

export default InviteVibersScreen