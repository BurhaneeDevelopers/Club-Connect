import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import { useState, useEffect } from "react";
import { ArrowLeft, Apple, Eye, EyeSlash } from "iconsax-react-native";

// Components
import AuthSwitch from "../Components/AuthSwitch";

// SVGS
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";
import Google from "../assets/icons/Google.svg";
import useAuth from "../Hooks/useAuth";

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
  const [activeInput, setActiveInput] = useState(0);

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    // Toggles Password Visibility and Invisibility
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [toast, setToast] = useState(false);

  const navigateAfterAccountCreated = (navigation) => {
    setToast(true);

    // Wait for 1-2 seconds and then navigate
    setTimeout(() => {
      setToast(false);
      // Navigate to the next screen (e.g., EmailConfirmation)
      navigation.navigate("LocationPick");
    }, 1000); // Adjust the timeout as needed
  };

  const { handleSignIn, handleSignInAnonymously } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const SignIn = async () => {
    try {
      setLoading(true);
      await handleSignIn(email, password, navigation);
      navigateAfterAccountCreated(navigation);
      setError(false);
      setLoading(false);
    } catch (error) {
      setToast(false);
      setLoading(false);
      if (error.code == "auth/invalid-email" || "auth/invalid-credential") {
        setError(true);
        setLoading(false);
      }
      console.log("Error during sign-in:", error);
      console.log(error.code);
    }
  };

  // signInAnonymously
  const SignInAnonymously = async () => {
    try {
      await handleSignInAnonymously(navigation);
      navigateAfterAccountCreated(navigation);
    } catch (error) {
      console.error("Error during anonymous sign-in:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="w-screen h-screen mx-auto px-5"
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className=""
      >
        <View className="flex-row justify-between w-full items-center my-5">
          {/* <Pressable
            onPress={() => navigation.goBack()}
            className="active:text-[#f7d0a0]"
          >
            <ArrowLeft size="24" color="#f9f9f9" />
          </Pressable> */}
          <AuthSparklePink width={64} height={64} />
        </View>

        {toast === true && (
          <Text
            className="text-[#000000] p-2 rounded-lg px-10 absolute top-10 bg-[#E9FA00] -right-5"
            style={GlobalStyles.fontBold}
          >
            Yayy! SignIn Successful!
          </Text>
        )}

        {loading ? (
          <View className="p-2 rounded-lg px-2 items-start justify-start absolute top-10 bg-[#E9FA00] right-0">
            <ActivityIndicator color="#000000" size={24} />
          </View>
        ) : null}

        <View className="my-auto items-center justify-center">
          <View className="items-center mt-5 space-y-2">
            <Text
              className="text-[#f9f9f9] text-4xl text-center"
              style={GlobalStyles.fontBold}
            >
              Sign in!
            </Text>
            <Text
              className="text-[#f9f9f9] text-center w-72 items-center text-sm"
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
                activeInput === 1 ? "#000000" : "#c5c5c5"
              }`}
              className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-sm ${
                activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
              }`}
              onBlur={handleInputBlur}
              onFocus={() => handleInputFocus(1)}
              style={GlobalStyles.fontMedium}
            />

            {/* Password Input */}
            <View className="items-end justify-center">
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!isPasswordVisible ? true : false}
                placeholder="Enter Your Password..."
                placeholderTextColor={`${
                  activeInput === 2 ? "#000000" : "#c5c5c5"
                }`}
                className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-sm ${
                  activeInput === 2 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
                }`}
                onBlur={handleInputBlur}
                onFocus={() => handleInputFocus(2)}
                style={GlobalStyles.fontMedium}
              />

              <View className="absolute px-5">
                <Pressable onPress={togglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <Eye size="28" color="#f9f9f9" />
                  ) : (
                    <EyeSlash size="28" color="#f9f9f9" />
                  )}
                </Pressable>
              </View>
            </View>
            <View className="flex-row justify-between items-center text-sm mb-5">
              <Text className="text-[#f9f9f9]">Forgot Password?</Text>
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
              // className={`w-full p-3 rounded-lg items-center bg-[#FF26B9] ${
              //   error ? "bg-[#FF26B9]/70" : ""
              // }`}
              className="w-full p-3 rounded-lg items-center bg-[#FF26B9] active:bg-[#c52d95]"
              onPress={SignIn}
            >
              <Text className="text-[#f9f9f9] text-lg">Sign In</Text>
            </Pressable>
          </View>

          <View className="flex-row space-x-4 mt-5 justify-center items-center">
            <View className="bg-[#f9f9f9] rounded-full p-4">
              <Google width={32} height={32} />
            </View>
            <View className="bg-[#f9f9f9] rounded-full p-4">
              <Apple size="32" color="#000000" variant="Bold" />
            </View>
            <Pressable
              className="bg-[#f9f9f9] rounded-full p-4"
              onPress={SignInAnonymously}
            >
              <Eye size="32" color="#000000" variant="Bold" />
            </Pressable>
          </View>

          <View className="flex-row items-center justify-center my-5 mt-10">
            <Text
              className="text-[#f9f9f9] text-center w-72 items-center text-sm"
              style={GlobalStyles.fontMedium}
            >
              New to VibeHotspot?{" "}
              <Text
                className="text-[#FF26B9] text-center"
                onPress={() => navigation.navigate("CreateAccount")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <BusinessSignIn navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const BusinessSignIn = ({ navigation }) => {
  return (
    <View className="flex justify-center items-center w-screen absolute bottom-0 mb-5">
      <Text
        className="text-[#f9f9f9] text-center w-72 items-center text-sm"
        style={GlobalStyles.fontMedium}
      >
        Are you a business?{" "}
        <Text
          className="text-[#FF26B9] text-center"
          onPress={() => navigation.navigate("BusinessSignIn")}
        >
          Sign In as Business
        </Text>
      </Text>
    </View>
  );
};
