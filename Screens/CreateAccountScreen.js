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
import { useState, useEffect } from "react";
import { ArrowLeft, Apple, Eye } from "iconsax-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

// FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "firebase";

// Components
import AuthSwitch from "../Components/AuthSwitch";

// SVGS
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";
// import CreateAccount from "../assets/Illustrations/CreateAccount.svg";
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

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace("Index")
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  const auth = getAuth();

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created successfully
        const user = userCredential.user;
        console.log("User created:", user);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // navigation.navigate("EmailConfirmation") Your will get a error (email undefined) pass email prop from here to emailconfirmation to get email there
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error creating user:", error);
      });
  };

  // Gotcha Bro Create Account Done!! Check firebase user is created. Try to create a function to send user confirmation Email for OTP!

  // Well done bro

 // Function to send a user confirmation email with OTP
const sendConfirmationEmail = async (userEmail) => {
  try {
    const user = firebase.auth().currentUser;

    // Generate a random OTP
    const otp = Math.floor(1000 + Math.random() * 7000);

    // Send the confirmation email with the OTP
    await user.sendEmailVerification();

    // Return the OTP
    return otp;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

// And this is how we validate the OTP
const userEmail = 'user@example.com';
sendConfirmationEmail(userEmail)
  .then((otp) => {
    console.log(`Email sent to ${userEmail} with OTP: ${otp}`);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// And this is the OTP verification

function OTPVerificationScreen() {
  const [otp, setOTP] = useState('');

  const handleVerifyOTP = async () => {
    try {
      // Verify the entered OTP
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, otp);
      await user.reauthenticateWithCredential(credential);

      // At this point, the user is verified
      console.log('User is verified.');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  
}





  const isCreateAccountButtonDisabled =
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    !email.endsWith("@gmail.com") ||
    password.length < 8 ||
    password !== confirmPassword;

  // This function generates a unique AccessToken for a user.
  const generateAccessToken = () => {
    // Generate a UUIDv4 token for the user.
    const accessToken = uuidv4();
    return accessToken;
  };

  // const handleCreateAccount = async () => {
  //   if (!isCreateAccountButtonDisabled) {
  //     try {
  //       const userCredential = await auth().createUserWithEmailAndPassword(
  //         email,
  //         password
  //       );

  //       // You can access the user's information through userCredential.user
  //       const user = userCredential.user;

  //       // Generate an AccessToken for the user.
  //       const accessToken = generateAccessToken();

  //       // Create the user data object with the AccessToken.
  //       const userData = {
  //         email,
  //         accessToken,
  //         uid: user.uid, // You can store the user's UID for future reference
  //       };

  //       // Store user data, including the AccessToken, in AsyncStorage.
  //       await AsyncStorage.setItem("userData", JSON.stringify(userData));
  //       // Redirect to a success or profile page
  //       navigation.navigate("EmailConfirmation", { email });
  //     } catch (error) {
  //       console.error("Error creating user: ", error);
  //       setError(true);
  //     }
  //   } else {
  //     setError(true);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto px-5"
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className=""
      >
        <View className="flex-row justify-between w-full items-center my-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="24" color="#f9f9f9" />
          </Pressable>
          <AuthSparklePink width={64} height={64} />
        </View>

        <View className="items-center mt-5 space-y-2">
          <Text
            className="text-[#f9f9f9] text-4xl text-center"
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
              className="text-[#FF26B9] text-center"
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
              activeInput === 1 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
              activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
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
              activeInput === 2 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] place text-lg ${
              activeInput === 2 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
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
              activeInput === 3 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
              activeInput === 3 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
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
                ? "bg-[#FF26B9]/70"
                : "bg-[#FF26B9] active:bg-[#FF26B9]/90"
            }`}
            onPress={handleSignUp}
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
            <Apple size="32" color="#101010" variant="Bold" />
          </View>
          <Pressable
            className="bg-[#f9f9f9] rounded-full p-4"
            onPress={() => navigation.navigate("Index")}
          >
            <Eye size="32" color="#101010" variant="Bold" />
          </Pressable>
        </View>

        <View className="flex-row items-center justify-center my-5">
          <Text
            className="text-[#f9f9f9] text-center w-72 items-center"
            style={GlobalStyles.fontRegular}
          >
            By creating an account or signing you agree to our&nbsp;
            <Text
              className="text-[#FF26B9] text-center underline"
              onPress={() => navigation.navigate("Index")}
            >
              Terms and Conditions
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
