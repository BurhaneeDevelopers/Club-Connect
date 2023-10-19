import { View, ScrollView, Text, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Setting2, Edit } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import TabBar from "../Components/TabBar";
import { useState } from "react";

const ProfileScreen = ({ navigation }) => {
  const [post, setPosts] = useState(true);
  const [saved, setSaved] = useState(false);
  const [live, setLive] = useState(false);
  return (
    <SafeAreaView>
      <View className="bg-[#E9FA00] h-80 rounded-b-[30px]">
        <View className="flex-row justify-between w-full items-center p-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="32" color="#101010" />
          </Pressable>

          <View className="flex-row items-center space-x-3">
            <Pressable>
              <Edit size="32" color="#101010" />
            </Pressable>
            <Pressable>
              <Setting2 size="32" color="#101010" />
            </Pressable>
          </View>
        </View>

        <View className="w-full justify-center items-center">
          <View className="space-y-2 justify-center items-center">
            <Image
              source={require("../assets/Illustrations/Avatar.jpg")}
              className="w-24 h-24 rounded-full"
            />

            <Text
              className="text-[#101010] text-xl"
              style={GlobalStyles.fontSemiBold}
            >
              @Mark_Antony
            </Text>
          </View>

          <View className="flex-row justify-center w-full items-center p-5 space-x-5">
            <View className="flex-col items-center justify-center">
              <Text className="text-lg" style={GlobalStyles.fontBold}>
                52
              </Text>
              <Text
                className="text-lg text-[#FF26B9]"
                style={GlobalStyles.fontMedium}
              >
                Posts
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <Text className="text-lg" style={GlobalStyles.fontBold}>
                252k
              </Text>
              <Text
                className="text-lg text-[#FF26B9]"
                style={GlobalStyles.fontMedium}
              >
                Followers
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <Text className="text-lg" style={GlobalStyles.fontBold}>
                149
              </Text>
              <Text
                className="text-lg text-[#FF26B9]"
                style={GlobalStyles.fontMedium}
              >
                Following
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="">
        <View className="p-5 mb-96">
          <TabBar setPosts={setPosts} setLive={setLive} setSaved={setSaved} />

          {post && (
            <>
              <View className="flex-row justify-center items-center gap-5 flex-wrap my-5">
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
                <View className="w-24 h-24 rounded-lg bg-gray-200"></View>
              </View>
            </>
          )}
          {saved && (
            <>
              <Text className="text-white">Saved Here</Text>
            </>
          )}
          {live && (
            <>
              <Text className="text-white">Live Here</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
