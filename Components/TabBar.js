import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

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
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
    </View>
  );
};

export default TabBar;
