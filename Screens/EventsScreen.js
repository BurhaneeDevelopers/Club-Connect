import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import illustration from "../assets/Illustrations/amico.png";
import i from "../assets/Illustrations/rafiki.png";
import { Pressable } from "react-native";
import { TextInput } from "react-native";

const EventsScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="h-screen justify-center items-center space-y-5">
        <View className="bg-[#FF26B9] py-4 px-5 rounded-3xl flex-column justify-center items-center">
          <Text
            className="text-3xl text-[#f9f9f9] py-3 "
            style={GlobalStyles.fontBold}
          >
            Coming Soon !
          </Text>
          <Text className="px-2 pb-3" style={GlobalStyles.fontmedium}>
            This screen is currently under construction.
          </Text>
        </View>
        <View>
          <Image source={illustration} className="w-80 h-72 " />
        </View>
        <View>
          <Pressable
            className="bg-[#E9FA00] rounded-lg px-3 py-3"
            onPress={() => navigation.goBack()}
          >
            <Text
              className="text-xl px-4 text-[#000000]"
              style={GlobalStyles.fontSemiBold}
            >
              Return to home
            </Text>
          </Pressable>
        </View>

    </SafeAreaView>
  );
};

export default EventsScreen;
