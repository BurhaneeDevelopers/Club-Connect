import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";
import { useState } from "react";
import { ArrowLeft, Apple, Eye } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import AuthSwitch from "../Components/AuthSwitch";

// SVGS
import AuthSparkle from "../assets/Illustrations/AuthSparkle.svg";
import Google from "../assets/icons/Google.svg";
import Mail from "../assets/icons/Mail.svg";

const SignInScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // navigation.replace("SignIn");
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Active State for inputs
  const [activeInput, setActiveInput] = useState();

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignIn = async () => {
    // Retrieve user data from AsyncStorage
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (
          parsedUserData.email === email &&
          parsedUserData.password === password
        ) {
          // User is signed in successfully
          navigation.navigate("Index");
        } else {
          setError(!error);
        }
      } else {
        setError(!error);
      }
    } catch (error) {
      console.error("Error while signing in: ", error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="bg-[#867665]"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
        className="w-screen h-screen mx-auto px-5"
      >
        <View className="flex-row justify-between w-full items-center my-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="active:text-[#f7d0a0]"
          >
            <ArrowLeft size="24" color="#f9f9f9" />
          </Pressable>
          <AuthSparkle width={64} height={64} />
        </View>
        <View className="my-auto items-center justify-center">
          <View className="items-center mt-5 space-y-2">
            <Text
              className="text-[#272727] text-4xl text-center"
              style={GlobalStyles.fontBold}
            >
              Sign in to Account
            </Text>
            <Text
              className="text-[#f9f9f9] text-center w-72 items-center"
              style={GlobalStyles.fontRegular}
            >
              Unlock the Beat 🎶 - Sign in to VibeHotspot now and groove to the
              rhythm of your world!
            </Text>
          </View>

          {/* Sign Up And Sign In Switches  */}
          <AuthSwitch navigation={navigation} route={route} />

          <View className="my-5 w-full space-y-3">
            {/* Email Input */}
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Enter Your Email..."
              placeholderTextColor={`${
                activeInput === 2 ? "#867665" : "#c5c5c5"
              }`}
              className={`border border-[#EADAAA] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
                activeInput === 2 ? "bg-[#EADAAA] text-[#867665]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              style={GlobalStyles.fontMedium}
            />

            {/* Password Input */}
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Enter Your Password..."
              placeholderTextColor={`${
                activeInput === 2 ? "#867665" : "#c5c5c5"
              }`}
              className={`border border-[#EADAAA] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
                activeInput === 2 ? "bg-[#EADAAA] text-[#867665]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              style={GlobalStyles.fontMedium}
            />
            <View className="flex-row justify-between items-center">
              <Text className="text-[#272727]">Forgot Password?</Text>
              <Text></Text>
            </View>

            {error && (
              <>
                <Text
                  className="text-[#c22121] text-center mt-3 text-base"
                  style={GlobalStyles.fontSemiBold}
                >
                  Invalid Email or Password Credentials
                </Text>
              </>
            )}

            <Pressable
              // className={`w-full p-3 rounded-lg items-center bg-[#272727] ${
              //   error ? "bg-[#272727]/70" : ""
              // }`}
              className="w-full p-3 rounded-lg items-center bg-[#272727] active:bg-[#393939]"
              onPress={handleSignIn}
            >
              <Text className="text-[#f9f9f9] text-lg">Sign In</Text>
            </Pressable>
          </View>

          <View className="flex-row space-x-4 mt-5 justify-center items-center">
            <View className="bg-[#f9f9f9] rounded-full p-4">
              <Google width={32} height={32} />
            </View>
            <View className="bg-[#f9f9f9] rounded-full p-4">
              <Apple size="32" color="#272727" variant="Bold" />
            </View>
            <Pressable
              className="bg-[#f9f9f9] rounded-full p-4"
              onPress={() => navigation.navigate("Index")}
            >
              <Eye size="32" color="#272727" variant="Bold" />
            </Pressable>
          </View>

          <View className="flex-row items-center justify-center my-5">
            <Text
              className="text-[#f9f9f9] text-center w-72 items-center"
              style={GlobalStyles.fontMedium}
            >
              New to VibeHotspot?{" "}
              <Text
                className="text-[#272727] text-center"
                onPress={() => navigation.navigate("CreateAccount")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignInScreen;
