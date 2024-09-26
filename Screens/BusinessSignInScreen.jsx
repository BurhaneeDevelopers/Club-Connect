import React from "react";
import {
  View,
  Text,
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
import { Eye, EyeSlash } from "iconsax-react-native";

// Components
import AuthSwitch from "../Components/AuthSwitch";

// FIREBASE

// SVGS
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";
import { auth, db } from "../firebase";
import useAllBusiness from "../Hooks/useAllBusiness";
import useAuth from "../Hooks/useAuth";
import { collection, doc, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const BusinessSignInScreen = ({ navigation, route }) => {
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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    // Toggles Password Visibility and Invisibility
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [toast, setToast] = useState("");

  const navigateAfterAccountCreated = (navigation) => {
    setToast("Yayy! SignIn Successful!");

    // Wait for 1-2 seconds and then navigate
    setTimeout(() => {
      setToast(null);
      // Navigate to the next screen (e.g., userNameConfirmation)
      navigation.navigate("LocationPick");
    }, 1000); // Adjust the timeout as needed
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { allBusiness, fetchAllBusiness } = useAllBusiness();

  useEffect(() => {
    fetchAllBusiness();
  }, []);

  const { handleSignIn } = useAuth();
  const checkCredentials = async () => {
    try {
      setToast("Analyzing existing accounts");
      const querySnapshot = await getDocs(collection(db, "Products"));

      querySnapshot.forEach(async (document) => {
        const data = document.data();
        if (data.userName === userName && data.password === password) {
          // If Credentials match
          console.log("Credentials matched in document:", document?.id);

          try {
            setToast("Looking for matching credentials!");
            // Assuming you have allBusiness which contains all the business data
            const matchedBusiness = allBusiness.find(
              (business) => business?.id === document?.id
            );

            if (matchedBusiness) {
              setToast("Creating account for you!");
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                data?.password
              );

              const user = userCredential?.user;

              if (user) {
                const userRef = doc(db, "allUsers", auth.currentUser.uid);
                setDoc(userRef, {
                  uid: auth.currentUser.uid,
                  email: user?.email,
                  password: password,
                  name: matchedBusiness.name,
                  userName: matchedBusiness.userName,
                  bio: "",
                  location: matchedBusiness.address,
                  profileImage: matchedBusiness.productImage,
                  following: [],
                  followers: [],
                });

                setToast("Signing In for you!");
                handleSignIn(email, password, navigation);
                navigateAfterAccountCreated(navigation);
              }
            } else {
              console.log(
                "No matching business found for document ID:",
                document.id
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.error("Error checking credentials:", error);
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

        {toast && (
          <Text
            className="text-[#000000] p-2 rounded-lg px-10 absolute top-10 bg-[#E9FA00] -right-5"
            style={GlobalStyles.fontBold}
          >
            {toast}
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
              Sign in as Business!
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
            {/* email Input */}
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Enter your email..."
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

            {/* userName Input */}
            <TextInput
              onChangeText={(text) => setUserName(text)}
              value={userName}
              placeholder="Enter your userName..."
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

            {/* Password Input */}
            <View className="items-end justify-center">
              <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!isPasswordVisible ? true : false}
                placeholder="Enter Your Password..."
                placeholderTextColor={`${
                  activeInput === 3 ? "#000000" : "#c5c5c5"
                }`}
                className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-sm ${
                  activeInput === 3 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
                }`}
                onBlur={handleInputBlur}
                onFocus={() => handleInputFocus(3)}
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
                  Invalid userName or Password Credentials
                </Text>
              </>
            )}

            <Pressable
              // className={`w-full p-3 rounded-lg items-center bg-[#FF26B9] ${
              //   error ? "bg-[#FF26B9]/70" : ""
              // }`}
              className="w-full p-3 rounded-lg items-center bg-[#FF26B9] active:bg-[#c52d95]"
              onPress={checkCredentials}
            >
              <Text className="text-[#f9f9f9] text-lg">
                Verify & Create Account
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <SignIn navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

export default BusinessSignInScreen;

const SignIn = ({ navigation }) => {
  return (
    <View className="absolute bottom-0 mb-5 flex justify-center items-center w-screen">
      <Text
        className="text-[#f9f9f9] text-center w-72 items-center text-sm"
        style={GlobalStyles.fontMedium}
      >
        Are you a user?{" "}
        <Text
          className="text-[#FF26B9] text-center"
          onPress={() => navigation.navigate("SignIn")}
        >
          Sign In as user!
        </Text>
      </Text>
    </View>
  );
};
