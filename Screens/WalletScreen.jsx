import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Car,
  Location,
  Star1,
  TicketStar,
  Wallet1,
} from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import LottieView from "lottie-react-native";
import { ProgressBar } from "react-native-paper";

// SVGS
import WalletCoin from "../assets/Illustrations/WalletCoin.svg";
import SectionTitles from "../Components/SectionTitles";

const WalletScreen = ({ navigation }) => {
  const animation = useRef();
  useEffect(() => {
    animation.current?.play();

    // Or set a specific startFrame and endFrame with:
    animation.current?.play(30, 120);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto"
    >
      <ScrollView className="">
        <View className="pb-20">
          <View className="flex-row w-full items-center p-5">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute ml-5"
            >
              <ArrowLeft size="32" color="#f9f9f9" />
            </Pressable>

            <Text
              className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
              style={GlobalStyles.fontSemiBold}
            >
              My Wallet
            </Text>
          </View>

          <View className="relative justify-center items-center w-full flex-row pt-7">
            <Text
              className="text-[#fff]/90 text-sm text-center mx-auto bg-[#101010] px-2.5 z-50"
              style={GlobalStyles.fontMedium}
            >
              The app is a part of beta testing! Stay Tuned!
            </Text>
          </View>

          <View className="p-5">
            <View className="mb-5">
              <Text
                className="text-white text-base mb-3"
                style={GlobalStyles.fontMedium}
              >
                Complete the tasks to fill the bar and earn PESO!
              </Text>

              <ProgressBar
                progress={0.7}
                color={"#E9FA00"}
                className="rounded-full h-3 mb-1 bg-[#262626]"
              />
              <View className="flex-row justify-between items-center">
                <Text className="text-[#FF26B9] text-base">View Tasks</Text>

                <Text
                  className="text-white text-base"
                  style={GlobalStyles.fontMedium}
                >
                  70%
                </Text>
              </View>
            </View>

            <View className="bg-[#262626] rounded-[30px] p-5 py-10">
              <View className="flex-row justify-between items-center">
                <View className="space-y-2">
                  <Text
                    className="text-5xl text-[#E9FA00]"
                    style={GlobalStyles.fontSemiBold}
                  >
                    0
                  </Text>
                  <View className="flex-row space-x-2 items-center">
                    <Wallet1 size="24" color="#FF26B9" variant="Bold" />
                    <Text
                      className="text-gray-200"
                      style={GlobalStyles.fontSemiBold}
                    >
                      Available Peso
                    </Text>
                  </View>
                </View>

                <View>
                  <WalletCoin width={72} height={72} />
                </View>
              </View>

              <Pressable className="w-full p-3 rounded-lg items-center bg-[#FF26B9] active:bg-[#c52d95] mt-7">
                <Text
                  className="text-[#f9f9f9] text-lg"
                  style={GlobalStyles.fontSemiBold}
                >
                  Encash Peso
                </Text>
              </Pressable>
            </View>

            <View className="mb-8 justify-center items-center">
              <LottieView
                ref={animation}
                autoPlay
                loop
                className="w-32 h-32"
                source={require("../assets/Illustrations/CryingHeart.json")}
              />
              <Text
                className="text-white text-xl text-center"
                style={GlobalStyles.fontBold}
              >
                OOPS !
              </Text>
              <Text
                className="text-white text-lg text-center"
                style={GlobalStyles.fontBold}
              >
                Your wallet is Empty{" "}
              </Text>
              <Text
                className="text-gray-200 w-52 text-center"
                style={GlobalStyles.fontMedium}
              >
                Book any Cafe or Hotspot to earn PESO.{" "}
                <Text
                  className="text-[#E9FA00]"
                  style={GlobalStyles.fontMedium}
                >
                  Learn More!
                </Text>
              </Text>
            </View>

            {/* <View className="mt-5">
              <View className="mb-3">
                <SectionTitles title={"Recent Activity & Bookings"} />
              </View>

              <View className="items-center">
                <RecentActivityCard />
                <RecentActivityCard />
                <RecentActivityCard />
                <RecentActivityCard />
              </View>
            </View> */}
            
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WalletScreen;

const RecentActivityCard = () => {
  return (
    <View className="bg-[#262626] rounded-2xl w-80 h-24 p-3 flex-row space-x-4 mx-2 overflow-hidden my-2">
      <View className="overflow-hidden rounded-xl">
        <Image
          source={require("../assets/Images/Santorini.jpg")}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-20 h-20"
        />
      </View>

      <View className="">
        <Text
          className="text-[#f9f9f9] w-44 text-base"
          numberOfLines={1}
          style={GlobalStyles.fontSemiBold}
        >
          Dancing party at new york and this is longer the text
        </Text>

        {/* Rating  */}
        <View className="flex-row items-center space-x-2 my-2">
          <View className="flex-row items-center space-x-1">
            <Star1 size="18" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              4
            </Text>
          </View>

          <Text className="text-gray-400 text-center">•</Text>

          <View className="flex-row items-center">
            <Car size="16" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              3km
            </Text>
          </View>
        </View>
        <Pressable
          className="py-0.5 border border-[#E9FA00] w-20 active:bg-[#101010] rounded-md"
          // onPress={() => navigation.navigate("GlobalDetails", {})}
        >
          <Text className="text-[#f9f9f9] text-center">Review</Text>
        </Pressable>
      </View>
    </View>
  );
};
