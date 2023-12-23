import { View, Text, Image, Pressable, Modal, TextInput } from "react-native";
import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Lock1, TickCircle } from "iconsax-react-native";
import * as LocalAuthentication from "expo-local-authentication";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MessageItemLockedCard = (props) => {
  const { user, navigation, sent, timestamp } = props.user;
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [isPinCorrect, setIsPinCorrect] = useState(true);
  const [pin, setPin] = useState(["", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState(false);
  // console.log("pin is typed", pin);

  const handlePinInput = useCallback(
    async (text, index) => {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text !== "" && index < 4) {
        inputRefs[index + 1].current.focus();
      } else if (text === "" && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    },
    [pin, inputRefs]
  );

  const checkPinAndOpenChat = async () => {
    const storedPin = await AsyncStorage.getItem(`user_pin_${user?.uid}`);
    console.log("pin", storedPin);

    if (isBiometricAuthenticated === true || pin.join("") === storedPin) {
      setIsPinCorrect(true);
      setPinModalVisible(!pinModalVisible);
      navigation.navigate("Chat", {
        user,
        sent,
        timestamp,
      });
    } else {
      setIsPinCorrect(!pinModalVisible);
    }
  };

  useEffect(() => {
    checkPinAndOpenChat();
  }, [isBiometricAuthenticated]);

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

  useEffect(() => {
    if (pinModalVisible) {
      const handleBiometricAuth = async () => {
        try {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate with your fingerprint",
          });

          if (result.success) {
            console.log("Authentication successful");
            setIsBiometricAuthenticated(true);
          } else {
            // Authentication failed
            console.log("Authentication failed");
          }
        } catch (error) {
          console.error("Error during biometric authentication:", error);
        }
      };
      handleBiometricAuth();
    }
  }, [pinModalVisible]);
  return (
    <View className="">
      <Pressable
        className="flex-row space-x-2 py-2 active:bg-[#262626]/40 my-2 w-full"
        onPress={() => {
          setPinModalVisible(!pinModalVisible);
        }}
      >
        <View>
          <Image
            source={require("../assets/Images/User/Dummy-Profile.png")}
            className="w-16 h-16 rounded-xl"
          />
          <View className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#FF26B9]">
            <Lock1 size={"14"} color="#E9FA00" variant="Bold" />
          </View>
        </View>
        <View className="">
          <Text
            className="text-[#FF26B9] text-lg max-w-[210px]"
            style={GlobalStyles.fontBold}
            numberOfLines={1}
          >
            @{user?.userName}
          </Text>

          <View className="flex-row items-center space-x-0.5">
            {sent && (
              <TickCircle size={"14"} color="#f9f9f9" variant="Outline" />
            )}
            <Text
              className="text-white text-base max-w-[200px]"
              style={GlobalStyles.fontMedium}
              numberOfLines={1}
            >
              {
                "Something on Locked Chat lorem Something on Locked Chat lorem Something on Locked Chat lorem Something on Locked Chat lorem"
              }
            </Text>
          </View>

          <Text
            className="text-gray-200 text-xs"
            style={GlobalStyles.fontMedium}
            numberOfLines={1}
          >
            {timestamp}
          </Text>
        </View>
      </Pressable>
      {/* <HR customClass={"bg-black"} /> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={pinModalVisible}
        onRequestClose={() => {
          setPinModalVisible(!pinModalVisible);
        }}
        className=""
      >
        <View className="h-full w-full absolute justify-center items-center bg-black/80">
          <View className="bg-[#262626] w-80 h-60 justify-center items-center rounded-3xl px-10">
            {/* <TextInput
                // secureTextEntry
                placeholder="Enter PIN"
                placeholderTextColor={"#fff"}
                onChangeText={(text) => setEnteredPin(text)}
                maxLength={5}
                className="text-white border p-2 px-10 rounded-xl my-5"
              /> */}
            <View className="flex-row space-x-2 mb-5">
              {pin.map((value, index) => (
                <TextInput
                  key={index}
                  value={value}
                  onChangeText={(text) => handlePinInput(text, index)}
                  keyboardType="numeric"
                  ref={inputRefs[index]}
                  maxLength={1}
                  onFocus={() => setActiveIndex(index)}
                  className={`border border-[#f9f9f9] text-[#E9FA00] flex-row rounded-lg text-xl text-center items-center justify-center p-2 ${
                    activeIndex === index && "border-[#FF26B9]"
                  } `}
                  style={GlobalStyles.fontSemiBold}
                />
              ))}
            </View>

            {!isPinCorrect && (
              <Text className="text-[#ff0000] mb-2">
                Incorrect PIN. Try again.
              </Text>
            )}

            <Pressable
              className="w-full bg-[#FF26B9] active:bg-[#c52d95] p-2.5 rounded-lg items-center"
              onPress={checkPinAndOpenChat}
            >
              <Text
                className="text-[#f9f9f9] text-lg"
                style={GlobalStyles.fontMedium}
              >
                Verify
              </Text>
            </Pressable>
            <View className="flex-row space-x-2 justify-end items-end mt-3 self-end">
              <Text
                className="text-white text-base"
                onPress={() => setPinModalVisible(!pinModalVisible)}
              >
                Close
              </Text>
              <Text
                className="text-white text-base"
                onPress={() => setPin(["", "", "", "", ""])}
              >
                Reset
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
