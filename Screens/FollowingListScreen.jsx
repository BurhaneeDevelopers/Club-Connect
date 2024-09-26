import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import {
  ArrowLeft,
  SearchNormal,
} from "iconsax-react-native";
import useFollowStatus from "../Hooks/useFollowStatus";
import { useRoute } from "@react-navigation/native";
import FollowButton from "../Components/FollowButton";
import { auth } from "../firebase";

const FollowingListScreen = ({ navigation }) => {
  const {
    params: { userId },
  } = useRoute();
  // Active State for inputs
  const [activeInput, setActiveInput] = useState(0);

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const { following, fetchFollowingStatus } = useFollowStatus(
    auth.currentUser.uid,
    userId
  );

  useEffect(() => {
    fetchFollowingStatus();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex-row w-full justify-between items-center px-5 py-3">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
            style={GlobalStyles.fontSemiBold}
            numberOfLines={1}
          >
            Following
          </Text>

          {/* Button to Save Cafe */}
          {/* <Pressable className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-4 right-5">
            <SearchNormal size="24" color={"#000000"} variant={"Outline"} />
          </Pressable> */}
        </View>
        <View className="p-5">
          <View className="flex-row items-center">
            <TextInput
              placeholder="Search following..."
              placeholderTextColor={`${
                activeInput === 1 ? "#000000" : "#c5c5c5"
              }`}
              className={`bg-[#000000] border border-[#FF26B9] w-full p-3 py-3 rounded-full text-[#f9f9f9] place text-lg overflow-hidden ${
                activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              style={{
                shadowColor: "#FF26B9",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.21,
                shadowRadius: 8.19,
                elevation: 32,
              }}
            />

            <View className="absolute right-7">
              <SearchNormal size={24} color="#E9FA00" variant="Outline" />
            </View>
          </View>
        </View>

        <View className="p-5">
          {/* // Inside your component's JSX */}
          {following.map((following) => (
            <View key={following.uid} className="my-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center space-x-3">
                  {following?.profileImage ? (
                    <Image
                      source={{ uri: following?.profileImage }}
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <Image
                      source={require("../assets/Images/User/Dummy-Profile.png")}
                      className="w-16 h-16 rounded-full"
                    />
                  )}

                  <View>
                    <Text
                      className="text-white text-lg max-w-[180px]"
                      numberOfLines={1}
                      style={GlobalStyles.fontSemiBold}
                    >
                      {following?.userName}
                    </Text>
                    <Text className="text-white text-xs">
                      {following?.name}
                    </Text>
                  </View>
                </View>

                {auth.currentUser.uid == following?.uid ? (
                  ""
                ) : (
                  <FollowButton
                    otherUserId={following?.uid}
                    customClass="px-4 py-2 rounded-lg"
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default FollowingListScreen;
