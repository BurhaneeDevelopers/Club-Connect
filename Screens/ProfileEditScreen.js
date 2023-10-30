import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Camera,
} from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import TabBar from "../Components/TabBar";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const ProfileEditScreen = ({ navigation }) => {
  const { userData, dispatch } = useContext(UserContext);
  // Active State for inputs
  const [activeInput, setActiveInput] = useState();

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  // FETCH EDITED PROFILE DATA

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const [editedProfileData, setEditedProfileData] = useState({}); // Initialize as an empty object
  const getUserEditedData = async () => {
    const userEditedData = await AsyncStorage.getItem("userEditedData");

    if (userEditedData) {
      const parsedUserEditedData = JSON.parse(userEditedData);
      setEditedProfileData(parsedUserEditedData);
    }
  };

  useEffect(() => {
    getUserEditedData();
    setName(editedProfileData.name);
    setUserName(editedProfileData.userName);
    setBio(editedProfileData.bio);
    setLocation(editedProfileData.location);
  }, []);

  // FIND ACCESSTOKEN
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Retrieve the access token from AsyncStorage
    const getAccessToken = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
        }
      } catch (error) {
        console.error("Error retrieving access token: ", error);
      }
    };

    getAccessToken();
  }, []);

  const SaveEditChanges = async () => {
    const userEditedData = { name, userName, bio, location };
    dispatch({ type: "UPDATE_PROFILE", payload: userEditedData });

    try {
      // Retrieve the access token from AsyncStorage and use it
      const userData = await AsyncStorage.getItem("userData");

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const accessToken = parsedUserData.accessToken;

        // Simulate sending the edited profile data to a server
        console.log(
          "Sending profile data to server with access token:",
          accessToken
        );
        console.log(userEditedData);

        // Update the userEditedData in AsyncStorage, if needed
        await AsyncStorage.setItem(
          "userEditedData",
          JSON.stringify(userEditedData)
        );
      } else {
        console.error("Access token not found.");
      }
    } catch (error) {
      console.error("Error editing user profile: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto px-5"
    >
      <ScrollView>
        <View className="flex-row w-full items-center p-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-3xl text-[#FF26B9] mx-auto"
            style={GlobalStyles.fontSemiBold}
          >
            Edit Profile
          </Text>
        </View>

        <View className="space-y-2 justify-center items-center my-5">
          <Image
            source={require("../assets/Illustrations/Avatar.jpg")}
            className="w-44 h-44 rounded-full"
          />
          <View className="bg-[#FF26B9] w-14 h-14 rounded-full absolute bottom-0 translate-x-14 justify-center items-center">
            <Camera size="36" color="#f9f9f9" />
          </View>
        </View>

        <View className="px-5">
          {/* Name  */}
          <View className="my-2">
            <Text
              className="text-[#f9f9f9] text-xl p-1"
              style={GlobalStyles.fontMedium}
            >
              Name:
            </Text>
            <TextInput
              placeholder="Enter Your Name..."
              placeholderTextColor={`${
                activeInput === 1 ? "#101010" : "#f9f9f9"
              }`}
              className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
                activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              value={name}
              onChangeText={(e) => setName(e)}
              style={GlobalStyles.fontMedium}
            />
          </View>

          {/* UserName  */}
          <View className="my-2">
            <Text
              className="text-[#f9f9f9] text-xl p-1"
              style={GlobalStyles.fontMedium}
            >
              UserName:
            </Text>
            <TextInput
              placeholder="Enter Your UserName..."
              placeholderTextColor={`${
                activeInput === 2 ? "#101010" : "#f9f9f9"
              }`}
              className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
                activeInput === 2 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(2)}
              value={userName}
              onChangeText={(e) => setUserName(e)}
              style={GlobalStyles.fontMedium}
            />
          </View>

          {/* Bio  */}
          <View className="my-2">
            <Text
              className="text-[#f9f9f9] text-xl p-1"
              style={GlobalStyles.fontMedium}
            >
              Bio:
            </Text>
            <TextInput
              placeholder="Enter Your Bio..."
              placeholderTextColor={`${
                activeInput === 3 ? "#101010" : "#f9f9f9"
              }`}
              className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
                activeInput === 3 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(3)}
              onChangeText={(e) => setBio(e)}
              value={bio}
              style={GlobalStyles.fontMedium}
            />
          </View>

          {/* Location  */}
          <View className="my-2">
            <Text
              className="text-[#f9f9f9] text-xl p-1"
              style={GlobalStyles.fontMedium}
            >
              Location:
            </Text>
            <TextInput
              placeholder="Enter Your Location..."
              placeholderTextColor={`${
                activeInput === 4 ? "#101010" : "#f9f9f9"
              }`}
              className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
                activeInput === 4 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(4)}
              value={location}
              onChangeText={(e) => setLocation(e)}
              style={GlobalStyles.fontMedium}
            />
          </View>
        </View>

        <View className="p-5 flex-row justify-center items-center space-x-5">
          <Pressable
            className="w-40 bg-[#FF26B9] active:bg-[#FF26B9]/70 p-3 rounded-lg items-center"
            onPress={SaveEditChanges}
          >
            <Text
              className="text-[#f9f9f9] text-lg"
              style={GlobalStyles.fontMedium}
            >
              Save Changes
            </Text>
          </Pressable>
          <Pressable
            className="w-40 border border-[#f9f9f9]/40 active:bg-[#FF26B9]/10 p-3 rounded-lg items-center"
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text
              className="text-[#f9f9f9] active:text-black text-lg"
              style={GlobalStyles.fontMedium}
            >
              Cancel
            </Text>
          </Pressable>

          {console.log([name, userName, bio, location])}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;
