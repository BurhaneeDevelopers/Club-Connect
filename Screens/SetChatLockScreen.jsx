import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import { useRef } from "react";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function SetChatLockScreen({ navigation }) {
  const {
    params: { user },
  } = useRoute();

  const [toast, setToast] = useState(false);

  const navigateAfterAccountCreated = (navigation) => {
    setToast(true);

    // Wait for 4-5 seconds and then navigate
    setTimeout(() => {
      setToast(false);
      // Navigate to the next screen (e.g., EmailConfirmation)
      navigation.navigate("MessageList");
    }, 4000); // Adjust the timeout as needed
  };

  //animation function declaration
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    // Check if the animation has already been played
    if (true) {
      try {
        animation.current?.play();
        setAnimationPlayed(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user?.uid]);

  const handleAnimationFinish = () => {
    setAnimationPlayed(true);
  };

  const [pin, setPin] = useState(["", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const [existingPin, setExistingPin] = useState(false);
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState(false);

  useEffect(() => {
    const fetchStoredPin = async () => {
      const biometricOrPinAvailable = await AsyncStorage.getItem(
        `user_pin_${user?.uid}`
      );
      if (biometricOrPinAvailable) {
        setExistingPin(true);
      } else {
        setExistingPin(false);
      }
    };

    fetchStoredPin();
  }, [user?.uid, existingPin, setExistingPin, isBiometricAuthenticated]);

  // const [fullPinEntered, setFullPinEntered] = useState(false);
  const handlePinInput = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text !== "" && index < 4) {
      inputRefs[index + 1].current.focus();
    } else if (text === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }

    // Check if the full PIN is entered
    // const isFullPinEntered = newPin.every((digit) => digit !== "");
    // setFullPinEntered(isFullPinEntered);
  };

  const savePinToStorage = async () => {
    try {
      const pinString = pin.join(""); // Convert the pin array to a string
      await AsyncStorage.setItem(`user_pin_${user?.uid}`, pinString);
      setAnimationPlayed(true);
      navigateAfterAccountCreated(navigation);
    } catch (error) {
      console.log(error);
    }
  };

  const removePin = async () => {
    if (existingPin) {
      AsyncStorage.removeItem(`user_pin_${user?.uid}`);
      setExistingPin(false);
      setIsBiometricAuthenticated(false);
      console.log("Pin Removed");
    }
  };

  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const available =
      (await LocalAuthentication.hasHardwareAsync()) &&
      (await LocalAuthentication.isEnrolledAsync());
    setIsBiometricAvailable(available);
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your fingerprint",
      });

      if (result.success) {
        // Authentication successful
        console.log("Authentication successful");
        setExistingPin(true);
        setIsBiometricAuthenticated(true);
        await AsyncStorage.setItem(`user_pin_${user?.uid}`, "true");
      } else {
        // Authentication failed
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error during biometric authentication:", error);
    }
  };
  return (
    <SafeAreaView className="h-full">
      {!animationPlayed && (
        <LottieView
          ref={animation}
          loop={false}
          autoPlay={false}
          onAnimationFinish={handleAnimationFinish}
          className="w-[700px] h-[1000px] absolute left-0 items-start justify-start top-0 -translate-x-20"
          source={require("../assets/Illustrations/confetti.json")}
        />
      )}

      <View className="flex-row w-full justify-between items-center p-5 absolute">
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
          Chat Lock Setting
        </Text>
      </View>

      {toast && (
        <Text
          className="text-[#000000] p-2 rounded-lg px-10 absolute top-16 bg-[#E9FA00] -right-5"
          style={GlobalStyles.fontBold}
        >
          Pin Set Successfully for {user?.userName}!
        </Text>
      )}

      {existingPin === true ? (
        <View className="h-full w-full flex-col justify-center items-center">
          <Text
            className="text-white text-2xl"
            style={GlobalStyles.fontSemiBold}
          >
            Pin Already Exists!
          </Text>

          <View className="space-y-2 w-full p-5">
            <Pressable className="w-full bg-[#FF26B9] active:bg-[#c52d95] p-3 rounded-lg items-center ">
              <Text
                className="text-[#f9f9f9] text-lg"
                style={GlobalStyles.fontMedium}
              >
                Reset Pin!
              </Text>
            </Pressable>

            <Pressable
              className="w-full bg-[#ff0000] active:bg-[#ff0000]/90 p-3 rounded-lg items-center "
              onPress={removePin}
            >
              <Text
                className="text-[#f9f9f9] text-lg"
                style={GlobalStyles.fontMedium}
              >
                Remove Pin
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="h-full justify-center items-center">
          <View className="flex-row space-x-5 my-10 p-5">
            {pin.map((value, index) => (
              <TextInput
                key={index}
                value={value}
                onChangeText={(text) => handlePinInput(text, index)}
                keyboardType="numeric"
                ref={inputRefs[index]}
                maxLength={1}
                onFocus={() => setActiveIndex(index)}
                className={`border border-[#f9f9f9] text-[#E9FA00] flex-row rounded-xl text-2xl text-center items-center justify-center p-4 ${
                  activeIndex === index && "border-[#FF26B9]"
                } `}
                style={GlobalStyles.fontSemiBold}
              />
            ))}
          </View>

          <View className="items-center p-5 mt-5">
            <Pressable
              className="w-full bg-[#FF26B9] active:bg-[#c52d95] p-3 rounded-xl items-center absolute bottom-10"
              onPress={() => {
                console.log("Clicked");
                savePinToStorage(); // Save the pin to AsyncStorage
                // navigation.goBack(); // Go back to the previous screen
                console.log("Set pin success");
              }}
              // disabled={!fullPinEntered}
            >
              <Text
                className="text-[#f9f9f9] text-lg"
                style={GlobalStyles.fontMedium}
              >
                Set Lock
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

          {isBiometricAvailable ? (
            <View className="px-5 w-full">
              <Pressable
                className="w-full bg-[#E9FA00] active:bg-[#f3ff51] p-3 rounded-xl items-center my-3"
                onPress={handleBiometricAuth}
              >
                <Text
                  className="text-[#000000] text-lg"
                  style={GlobalStyles.fontMedium}
                >
                  Set Fingerprint Lock
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text className="text-white my-3">
              OOPS!! Biometric authentication is not available on this device.
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
