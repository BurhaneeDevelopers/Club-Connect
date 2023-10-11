import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  RefreshControl,
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

const CreateAccountScreen = ({ navigation, route }) => {
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

  // CHECK IF ENTERED CREDENTIALS ARE CORRECT
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const isCreateAccountButtonDisabled =
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    !email.endsWith("@gmail.com") ||
    password.length < 8 ||
    password !== confirmPassword;

  const handleCreateAccount = async () => {
    if (!isCreateAccountButtonDisabled) {
      // Create the user and store data in AsyncStorage
      const userData = {
        email,
        password, // Note: You should never store passwords in plain text in a real application
      };

      try {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        // console.log(userData);

        // Redirect to a success or profile page
        navigation.navigate("EmailConfirmation", { email });
      } catch (error) {
        console.error("Error storing user data: ", error);
      }
    } else {
      setError(!error);
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
        className="bg-[#867665] h-screen w-screen  items-center justify-center mx-auto px-5"
      >
        <View className="flex-row justify-between w-full items-center my-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="24" color="#f9f9f9" />
          </Pressable>
          <AuthSparkle width={64} height={64} />
        </View>

        <View className="items-center mt-5 space-y-2">
          <Text
            className="text-[#272727] text-4xl text-center"
            style={GlobalStyles.fontBold}
          >
            Create Account
          </Text>
          <Text
            className="text-[#f9f9f9] text-center w-72 items-center "
            style={GlobalStyles.fontRegular}
          >
            New to VibeHotspot? Explore our app by creating a account or&nbsp;
            <Text
              className="text-[#272727] text-center"
              onPress={() => navigation.navigate("Index")}
              style={GlobalStyles.fontMedium}
            >
              Join as a Guest!
            </Text>
          </Text>
        </View>

        {/* Sign Up And Sign In Switches  */}

        <AuthSwitch navigation={navigation} route={route} />

        {/* Auth Inputs  */}
        <View className="my-5 w-full space-y-3">
          {/* Email Input  */}

          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter Your Email..."
            placeholderTextColor={`${
              activeInput === 1 ? "#867665" : "#272727"
            }`}
            className={`border border-[#EADAAA] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
              activeInput === 1 ? "bg-[#EADAAA] text-[#867665]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(1)}
            style={GlobalStyles.fontMedium}
          />

          {/* If email is empty or doesnt end with @gmail.com  */}
          {email !== "" && !email.endsWith("@gmail.com") ? (
            <>
              <Text className="text-[#ff0000]" style={GlobalStyles.fontMedium}>
                Please Enter Valid Email!
              </Text>
            </>
          ) : null}

          {/* Password Input  */}
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Enter Your Password..."
            placeholderTextColor={`${
              activeInput === 2 ? "#867665" : "#272727"
            }`}
            className={`border border-[#EADAAA] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
              activeInput === 2 ? "bg-[#EADAAA] text-[#867665]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(2)}
            style={GlobalStyles.fontMedium}
          />
          {/* If password is empty or is less than 8 characters  */}
          {password !== "" && password.length < 8 ? (
            <>
              <Text className="text-[#ff0000]" style={GlobalStyles.fontMedium}>
                Password Must be atleast 8 Characters!
              </Text>
            </>
          ) : null}

          {/* Confirm Password Input  */}
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm Your Password..."
            placeholderTextColor={`${
              activeInput === 3 ? "#867665" : "#272727"
            }`}
            className={`border border-[#EADAAA] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
              activeInput === 3 ? "bg-[#EADAAA] text-[#867665]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(3)}
            style={GlobalStyles.fontMedium}
          />
          {/* If confirm Password is not matching with password and it is empty  */}
          {confirmPassword !== "" && password !== confirmPassword ? (
            <>
              <Text className="text-[#ff0000]" style={GlobalStyles.fontMedium}>
                Confirm Password Must Match Password!
              </Text>
            </>
          ) : null}

          {error && (
            <>
              <Text
                className="text-[#ff0000] text-center mt-3 text-base"
                style={GlobalStyles.fontMedium}
              >
                Invalid Email or Password
              </Text>
            </>
          )}

          <Pressable
            disabled={isCreateAccountButtonDisabled}
            className={`w-full p-3 rounded-lg items-center ${
              isCreateAccountButtonDisabled
                ? "bg-[#272727]/70"
                : "bg-[#272727] active:bg-[#393939]"
            }`}
            onPress={handleCreateAccount}
          >
            <Text
              className="text-[#f9f9f9] text-lg"
              style={GlobalStyles.fontMedium}
            >
              Create Account
            </Text>
          </Pressable>
        </View>

        <View>
          <Text
            className="text-white text-center text-lg"
            style={GlobalStyles.fontMedium}
          >
            or
          </Text>
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
            style={GlobalStyles.fontRegular}
          >
            By creating an account or signing you agree to our&nbsp;
            <Text
              className="text-[#272727] text-center underline"
              onPress={() => navigation.navigate("Index")}
            >
              Terms and Conditions
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateAccountScreen;
