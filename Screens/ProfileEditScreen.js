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
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import useAuth from "../Hooks/useAuth";

// Contexts
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

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
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);
  const [success, setSuccess] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const auth = getAuth();
  useEffect(() => {
    const cleanup = () => {
      // Reset state when component unmounts
      setName(null);
      setUserName(null);
      setBio(null);
      setLocation(null);
      setSuccess(false);
    };

    const ReadData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setUserName(docSnap.data().userName);
        setBio(docSnap.data().bio);
        setLocation(docSnap.data().location);
      }
    };

    ReadData();

    // Cleanup function will be called when the component unmounts
    return cleanup;
  }, [auth.currentUser.uid]);


  // Save data in DB and in CONTEXT
  const handleSaveData = async () => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: name,
        userName: userName,
        bio: bio,
        location: location,
      });

      // Update the context with the new user details
      setUserDetails({
        name: name,
        userName: userName,
        bio: bio,
        location: location,
      });

      setSuccess(true);

      // Log the updated user details after setting the state
      console.log(userDetails);
    } catch (error) {
      console.log(error);
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
              onChangeText={(text) => setName(text)}
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
              onChangeText={(text) => setUserName(text)}
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
              value={bio}
              onChangeText={(text) => setBio(text)}
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
              onChangeText={(text) => setLocation(text)}
              style={GlobalStyles.fontMedium}
            />
          </View>
        </View>

        {success && (
          <Text
            className="text-[#E9FA00] px-5 mt-2"
            style={GlobalStyles.fontMedium}
          >
            Hoorraayy!! Profile Saved Successfuly!
          </Text>
        )}

        <View className="p-5 flex-row justify-center items-center space-x-5">
          <Pressable
            className="w-40 bg-[#FF26B9] active:bg-[#FF26B9]/70 p-3 rounded-lg items-center"
            onPress={handleSaveData}
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;
