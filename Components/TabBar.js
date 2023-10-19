import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabBar = ({ setPosts, setSaved, setLive }) => {
  const [activeTab, setActiveTab] = useState("Posts");

  const handleTabPress = (tab) => {
    if (tab === "Posts") {
      setPosts(true);
      setSaved(false);
      setLive(false);
    } else if (tab === "Saved") {
      setPosts(false);
      setSaved(true);
      setLive(false);
    } else if (tab === "Live") {
      setPosts(false);
      setSaved(false);
      setLive(true);
    }

    setActiveTab(tab);
  };
  return (
    <View className="flex-row justify-between items-center border border-transparent border-b-white">
      <TouchableOpacity
        className={`flex-1 py-3 border border-transparent ${
          activeTab === "Posts" ? "border-b-[#E9FA00]" : ""
        }`}
        onPress={() => handleTabPress("Posts")}
      >
        <Text
          className="text-white text-xl text-center"
          style={GlobalStyles.fontMedium}
        >
          Posts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 py-3 border border-transparent ${
          activeTab === "Saved" ? "border-b-[#E9FA00]" : ""
        }`}
        onPress={() => handleTabPress("Saved")}
      >
        <Text
          className="text-white text-xl text-center"
          style={GlobalStyles.fontMedium}
        >
          Saved
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 py-3 border border-transparent ${
          activeTab === "Live" ? "border-b-[#E9FA00]" : ""
        }`}
        onPress={() => handleTabPress("Live")}
      >
        <Text
          className="text-white text-xl text-center"
          style={GlobalStyles.fontMedium}
        >
          Live
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
