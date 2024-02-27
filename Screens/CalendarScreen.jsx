import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import illustration from "../assets/Illustrations/amico.png";
import { ArrowLeft } from "iconsax-react-native";

const CalendarScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="">
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
          My Calendar
        </Text>
      </View>

      <View className="p-5 space-y-5 mt-10">
        <View className="bg-[#E9FA00] py-5 px-5 rounded-3xl flex-column justify-center items-center ">
          <Text
            className="text-4xl text-[#000000] py-2 "
            style={GlobalStyles.fontBold}
          >
            Coming Soon !
          </Text>
          <Text
            className="px-2 pb-3 text-base text-[#464646]"
            style={GlobalStyles.fontMedium}
          >
            This screen is currently under construction.
          </Text>
          <View className="pb-3 pt-3">
            <Image source={illustration} className="w-80 h-72 " />
          </View>
        </View>

        <View>
          <Pressable
            className="bg-[#FF26B9] rounded-lg px-3 py-3 flex justify-center items-center"
            onPress={() => navigation.navigate("Index")}
          >
            <Text
              className="text-xl px-4 text-[#f9f9f9]"
              style={GlobalStyles.fontSemiBold}
            >
              Return to Home
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
