import { View, Text } from "react-native";
import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import { Skeleton } from "@rneui/base";

const SectionTitles = ({ title }) => {
  return (
    <View className="relative justify-center items-center w-full flex-row ">
      <HR />
      {title ? (
        <Text
          className="text-[#fff]/90 text-lg text-center mx-auto bg-[#101010] px-2.5 z-50 uppercase"
          style={GlobalStyles.fontMedium}
        >
          {title}
        </Text>
      ) : (
        <Skeleton animation="pulse" width={180} height={10} />
      )}
      <HR />
    </View>
  );
};

export default SectionTitles;

const HR = () => {
  return <View className="h-[1px] w-full rounded-full bg-gray-500" />;
};
