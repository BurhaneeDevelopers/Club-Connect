import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Book,
  Camera,
  FilterSearch,
  Lock1,
  Map,
  Messages,
  Microscope,
  People,
  SearchStatus,
  SearchStatus1,
  TickCircle,
} from "iconsax-react-native";
import * as LocalAuthentication from "expo-local-authentication";

// Components
import SectionTitles from "../Components/SectionTitles";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import HR from "../Components/HR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import { useCallback } from "react";
import userGlobalUsers from "../Hooks/useGlobalUsers";
import { MessageItemLockedCard } from "../Components/MessageItemLockedCard";

const MessageListScreen = ({ navigation }) => {
  const { users, fetchUsers } = userGlobalUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  const [usersWithPins, setUsersWithPins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from AsyncStorage to determine users with pins
      const pins = await AsyncStorage.multiGet(
        users.map((user) => `user_pin_${user.uid}`)
      );

      const usersWithPins = users.map((user, index) => ({
        ...user,
        hasPin: !!pins[index][1], // Set hasPin based on whether there is a stored pin
      }));

      setUsersWithPins(usersWithPins);
    };

    fetchData();
  }, [usersWithPins]);

  const [showLockedChats, setShowLockedChats] = useState(false);

  const toggleLockedChats = () => {
    setShowLockedChats(!showLockedChats);
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-row w-full justify-between items-center p-5">
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
          Messages
        </Text>

        {/* Button to Save Cafe */}
        <Pressable
          className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
          onPress={() => navigation.navigate("MessageList")}
        >
          <SearchStatus1 size="24" color={"#000000"} variant={"Outline"} />
        </Pressable>
      </View>

      {/* Recent Interactions  */}
      <View className="p-5">
        <SectionTitles title={"Highlights & Stories"} />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={true}
        >
          <View className="flex-row mt-5">
            {users.map((user) => {
              return (
                <RecentFreindsChatCards
                  key={user.id}
                  senderUserName={user.senderUserName}
                  navigation={navigation}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      <ScrollView>
        <View className="bg-[#000000] px-5">
          {usersWithPins.some((user) => user.hasPin) && (
            <View className="bg-[#262626] px-5 rounded-xl">
              <Pressable
                className="bg-[#262626] active:bg-[262626]/10 py-5 flex-row items-center space-x-2"
                onPress={toggleLockedChats}
              >
                <Lock1 size={32} color="#E9FA00" variant="Outline" />

                <Text
                  className="text-white text-lg"
                  style={GlobalStyles.fontSemiBold}
                >
                  Locked Chats
                </Text>
              </Pressable>

              {showLockedChats &&
                usersWithPins.map((user) => {
                  return (
                    user.hasPin && (
                      <MessageItemLockedCard
                        key={user.id}
                        user={{
                          user: user,
                          navigation: navigation,
                          sent: true,
                          timestamp: "12:32",
                        }}
                      />
                    )
                  );
                })}
            </View>
          )}

          {usersWithPins.map((user) => {
            return (
              !user.hasPin && (
                <MessageItemCard
                  key={user.id}
                  user={{
                    user: user,
                    navigation: navigation,
                    sent: true,
                    timestamp: "12:32",
                  }}
                />
              )
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageListScreen;

const RecentFreindsChatCards = ({ senderUserName, image, navigation }) => {
  return (
    <Pressable
      className="flex-col items-center justify-center space-y-1 mr-6"
      // onPress={() => navigation.navigate("Chat")}
    >
      <Image
        source={require("../assets/Images/User/Dummy-Profile.png")}
        className="w-16 h-16 rounded-full"
      />

      <Text
        className=" text-white mx-auto max-w-[80px]"
        numberOfLines={1}
        style={GlobalStyles.fontMedium}
      >
        {senderUserName}
      </Text>
    </Pressable>
  );
};

const MessageItemCard = (props) => {
  const { user, navigation, sent, timestamp } = props.user;
  return (
    <View className="">
      <Pressable
        className="flex-row space-x-2 py-2 active:bg-[#262626]/40 my-2 w-full"
        onPress={() =>
          navigation.navigate("Chat", {
            user,
            sent,
            timestamp,
          })
        }
      >
        <Image
          source={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-16 h-16 rounded-xl"
        />
        <View className="">
          <Text
            className="text-[#FF26B9] text-lg"
            style={GlobalStyles.fontBold}
          >
            @{user?.userName}
          </Text>
          <View className="flex-row items-center space-x-0.5">
            {sent && (
              <TickCircle size={"14"} color="#f9f9f9" variant="Outline" />
            )}
            <Text
              className="text-[#f9f9f9] text-base max-w-[300px]"
              style={GlobalStyles.fontMedium}
              numberOfLines={1}
            >
              {"Some Dummy Message"}
            </Text>
          </View>
          <Text
            className="text-gray-200 text-xs"
            style={GlobalStyles.fontMedium}
            numberOfLines={1}
          >
            {timestamp}
          </Text>
        </View>
      </Pressable>
      {/* <HR customClass={"bg-[#FF26B9]"} /> */}
    </View>
  );
};
