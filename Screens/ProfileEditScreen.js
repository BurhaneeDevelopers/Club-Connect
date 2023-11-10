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
import { ArrowLeft, Camera } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import TabBar from "../Components/TabBar";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../firebase";
import { firebase } from "@react-native-firebase/firestore";
import useAuth from "../Hooks/useAuth";
import { Alert } from "react-native";
import { updateProfile } from "firebase/auth";

const ProfileEditScreen = ({ navigation }) => {
  // Active State for inputs
  const [activeInput, setActiveInput] = useState();

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  // FETCH EDITED PROFILE DATA
  const auth = getAuth();
  const [userData, setUserData] = useState({
    name: "",
    userName: "",
    bio: "",
    location: "",
  });

  const { user } = useAuth();
  const userDocRef = firestore().collection("users").doc(user.uid);

  const [userSnapshot, loading, error] = useDocumentData(userDocRef);

  useEffect(() => {
    // Load user data when the component mounts
    if (!loading && userSnapshot) {
      setUserData(userSnapshot.data());
    }
  }, [loading, userSnapshot]);

  // const profileEditRef = firestore().collection("users");

  const handleEditProfile = async () => {
    try {
      if (!userSnapshot.exists) {
        // If the user document doesn't exist, create a new document
        await setDoc(userDocRef, {
          name: userData.name,
          userName: userData.userName,
          bio: userData.bio,
          location: userData.location,
        });
      } else {
        // If the user document exists, update the existing document
        await updateDoc(userDocRef, {
          name: userData.name,
          userName: userData.userName,
          bio: userData.bio,
          location: userData.location,
        });
      }

      // Display a success message or navigate to another screen
      // ...
    } catch (error) {
      console.error("Error updating profile:", error);
      // Display an error message to the user
      // ...
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
              value={userData ? userData.name : ""}
              onChangeText={(txt) => setUserData({ ...userData, name: txt })}
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
              value={userData ? userData.userName : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, userName: txt })
              }
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
              value={userData ? userData.bio : ""}
              onChangeText={(txt) => setUserData({ ...userData, bio: txt })}
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
              value={userData ? userData.location : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, location: txt })
              }
              style={GlobalStyles.fontMedium}
            />
          </View>
        </View>

        <View className="p-5 flex-row justify-center items-center space-x-5">
          <Pressable
            className="w-40 bg-[#FF26B9] active:bg-[#FF26B9]/70 p-3 rounded-lg items-center"
            onPress={handleEditProfile}
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

          {/* {console.log([name, userName, bio, location])} */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;
