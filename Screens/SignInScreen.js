import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";
import { useState, useEffect } from "react";
import { ArrowLeft, Apple, Eye, EyeSlash } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Context
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

// JSON Data
import names from "../randomName.json";
import userNames from "../randomUserName.json";

// Components
import AuthSwitch from "../Components/AuthSwitch";

// FIREBASE
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

// SVGS
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";
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
  const [activeInput, setActiveInput] = useState(0);

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    // Toggles Password Visibility and Invisibility
    setIsPasswordVisible(!isPasswordVisible);
  };

  const auth = getAuth();

  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateAfterAccountCreated = (navigation) => {
    setToast(true);

    // Wait for 1-2 seconds and then navigate
    setTimeout(() => {
      setToast(false);
      // Navigate to the next screen (e.g., EmailConfirmation)
      navigation.navigate("LocationPick");
    }, 1000); // Adjust the timeout as needed
  };

  const { signIn, fetchUserDetails } = useContext(UserDetailsContext);

  // const isSignedIn = AsyncStorage.getItem("hasSignedIn");
  // useEffect(() => {
  //   // If the user is already signed in, navigate to the home screen
  //   if (isSignedIn === true) {
  //     console.log(isSignedIn);
  //     navigation.navigate("Index");
  //   }
  // }, [isSignedIn]);

  const handleSignIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          fetchUserDetails(auth.currentUser.uid);
        }
        console.log("Logged in with:", user.email);
        setError(false);
        AsyncStorage.setItem("playAnimation", "true");
        setLoading(false);
        signIn();
        AsyncStorage.setItem("hasSignedIn", "true");
        navigateAfterAccountCreated(navigation);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  // signInAnonymously
  const handleSignInAnonymously = async () => {
    try {
      // Generate a random index to select a name and username from the JSON
      const randomIndex = Math.floor(Math.random() * 35);
      const selectedName = names.names[randomIndex];
      const selectedUsername = userNames.usernames[randomIndex];

      await signInAnonymously(auth)
        .then(() => {
          // User created successfully

          // Store the selected name and username in local storage
          AsyncStorage.setItem("Name", selectedName);
          AsyncStorage.setItem("UserName", selectedUsername);

          AsyncStorage.setItem("playAnimation", "true");
          signIn();
          AsyncStorage.setItem("hasSignedIn", "true");
          navigation.navigate("LocationPick");
        })
        .catch((error) => {
          setError("An error occurred. Please try again.");
          console.error("Error signing in Anonymously:", error);
        });
    } catch (error) {
      console.error("Error while signing in anonymously:", error);
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
            className="text-[#101010] p-2 rounded-lg px-10 absolute top-10 bg-[#E9FA00] -right-5"
            style={GlobalStyles.fontBold}
          >
            Yayy! SignIn Successful!
          </Text>
        )}

        {loading ? (
          <View className="p-2 rounded-lg px-2 items-start justify-start absolute top-10 bg-[#E9FA00] right-0">
            <ActivityIndicator color="#101010" size={24} />
          </View>
        ) : null}

        <View className="my-auto items-center justify-center">
          <View className="items-center mt-5 space-y-2">
            <Text
              className="text-[#f9f9f9] text-4xl text-center"
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
                activeInput === 1 ? "#101010" : "#c5c5c5"
              }`}
              className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
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
                  activeInput === 2 ? "#101010" : "#c5c5c5"
                }`}
                className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
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
            <View className="flex-row justify-between items-center">
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
              <Apple size="32" color="#101010" variant="Bold" />
            </View>
            <Pressable
              className="bg-[#f9f9f9] rounded-full p-4"
              onPress={handleSignInAnonymously}
            >
              <Eye size="32" color="#101010" variant="Bold" />
            </Pressable>
          </View>

          <View className="flex-row items-center justify-center my-5">
            <Text
              className="text-[#f9f9f9] text-center w-72 items-center"
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
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
