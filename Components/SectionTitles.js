import { View, Text } from "react-native";
import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";

const SectionTitles = ({ title }) => {
  return (
    <Text className="text-[#f9f9f9] text-2xl" style={GlobalStyles.fontBold}>
      {title}
    </Text>
  );
};

export default SectionTitles;
