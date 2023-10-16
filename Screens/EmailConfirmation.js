import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "iconsax-react-native";

// SVGS
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";

const EmailConfirmation = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  // CHECK IS OTP IS WRONG
  const [showError, setShowError] = useState(false); // New state to manage the error display
  const [fullOtpEntered, setFullOtpEntered] = useState(false);
  const handleChange = (text, index) => {
    // Update the OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Focus the next input or blur current input
    if (text !== "" && index < 4) {
      inputRefs[index + 1].current.focus();
    } else if (text === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }

    // Check if full OTP is entered
    const enteredOtp = newOtp.join("");
    if (enteredOtp.length === 5) {
      if (enteredOtp === "12345") {
        // OTP is correct, clear the error message and enable the button
        setShowError(false);
        setFullOtpEntered(true);
      } else {
        // OTP is incorrect, show an error message and disable the button
        setShowError(true);
        setFullOtpEntered(false);
      }
    } else {
      // If OTP is not complete, reset error and disable states
      setShowError(false);
      setFullOtpEntered(false);
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join(""); // Combine the entered OTP digits into a string

    if (enteredOtp === "12345") {
      // Replace "12345" with the correct OTP
      // OTP is correct, navigate to the next screen or perform the desired action
      navigation.navigate("SignIn");
    } else {
      // OTP is incorrect, show an error message
      setShowError(true);
    }
  };

  // RESEND CODE
  const [showTimer, setShowTimer] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let countdownInterval;

    if (showTimer) {
      countdownInterval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(countdownInterval);
          setShowTimer(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, showTimer]);

  const handleResendCode = () => {
    // Here, you can implement the logic to resend the code, for example, making an API call.

    // After successfully resending the code, start the countdown again
    setShowTimer(true);
    setCountdown(30);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      className="h-screen w-screen mx-auto px-5"
    >
      <View className="h-screen items-center justify-center">
        <View className="flex-row justify-between w-full items-center my-5 absolute top-0">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>
          <AuthSparklePink width={70} height={70} />
        </View>

        <View className="items-center mt-5">
          <View className="gap-2">
            <Text
              className="text-[#f9f9f9] text-4xl text-center"
              style={GlobalStyles.fontBold}
            >
              Verify your email
            </Text>
            <Text
              className="text-[#f9f9f9] text-center w-72 items-center text-base"
              style={GlobalStyles.fontRegular}
            >
              We’ve sent an email Confirmation Code to&nbsp;
              <Text
                className="text-[#f9f9f9] text-center"
                onPress={() => navigation.navigate("Index")}
              >
                {email}
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex-row space-x-5 my-10">
          {otp.map((value, index) => (
            <TextInput
              key={index}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="numeric"
              ref={inputRefs[index]}
              maxLength={1}
              onFocus={() => setActiveIndex(index)}
              className={`border border-[#f9f9f9] text-[#E9FA00] flex-row rounded-xl text-2xl text-center items-center justify-center p-4 ${
                activeIndex === index && "border-[#FF26B9]"
              } ${showError ? "border-[#ff0000]" : ""}`}
              style={GlobalStyles.fontSemiBold}
            />
          ))}
        </View>

        {showError && (
          <Text className="text-[#ff0000] text-base mb-4">
            Incorrect OTP. Please try again.
          </Text>
        )}

        {showTimer ? (
          <Text
            className="text-[#f9f9f9] text-base"
            style={GlobalStyles.fontSemiBold}
          >
            Send Code again in : 00:{String(countdown).padStart(2, "0")}
          </Text>
        ) : (
          <Text
            onPress={handleResendCode}
            className="text-[#EADAAA]"
            style={GlobalStyles.fontSemiBold}
          >
            Resend code
          </Text>
        )}
      </View>

      <View className="items-center">
        <Pressable
          disabled={!fullOtpEntered} // Disable the button when showError is true
          className={`w-full bg-[#FF26B9] active:bg-[#393939] p-3 rounded-lg items-center absolute bottom-10 ${
            !fullOtpEntered ? "bg-[#FF26B9]/70" : ""
          }`}
          onPress={() => {
            handleVerify();
          }}
        >
          <Text
            className="text-[#f9f9f9] text-lg"
            style={GlobalStyles.fontMedium}
          >
            Create Account
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmailConfirmation;
