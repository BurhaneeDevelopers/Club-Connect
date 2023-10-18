import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";

const HR = ({ customClass }) => {
  const [isCustomClass, setCustomClass] = useState("");

  return (
    <View
      className={`h-[1px] w-full rounded-full ${
        isCustomClass ? "bg-gray-100" : customClass
      }`}
    />
  );
};

export default HR;
