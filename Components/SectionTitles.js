import { View, Text } from "react-native";
import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";

const SectionTitles = ({ title }) => {
  return (
    <View className="relative justify-center items-center w-full flex-row ">
      <HR />
      <Text
        className="text-[#fff]/90 text-lg text-center mx-auto bg-[#101010] px-2.5 z-50 uppercase"
        style={GlobalStyles.fontMedium}
      >
        {title}
      </Text>
      <HR />
    </View>
  );
};

export default SectionTitles;

const HR = () => {
  return <View className="h-[1px] w-full rounded-full bg-gray-500" />;
};
