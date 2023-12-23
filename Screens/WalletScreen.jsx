import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Location, TicketStar, Wallet1 } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import LottieView from "lottie-react-native";

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
                    <Wallet1 size="24" color="#FF8A65" variant="Bold" />
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

            {/* <View className="mb-5">
              <View className="mb-3">
                <SectionTitles title={"Explore Hotspots and Cafe!"} />
              </View>

              <SavedCards />
              <SavedCards />
              <SavedCards />
              <SavedCards />
            </View> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WalletScreen;

const SavedCards = () => {
  return (
    <View className="flex-row space-x-3 p-2 bg-[#FF26B9] rounded-xl h-24 my-2">
      <View
        className="overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 32,
        }}
      >
        <Image
          source={require("../assets/Images/Santorini.jpg")}
          className="w-20 h-20 rounded-lg"
        />
      </View>
      <View className="">
        <Text
          className="text-base text-[#101010] w-64"
          style={GlobalStyles.fontBold}
        >
          Dance party at the top of the town - 2022
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="space-x-1 flex-row items-end">
            <Location size="18" color="#101010" variant="Bold" />
            <Text
              className="text-[#101010] text-base"
              style={GlobalStyles.fontMedium}
            >
              Greece
            </Text>
          </View>

          <View className="bg-[#E9FA00] px-5 py-1.5 rounded-lg justify-center items-center">
            <Text
              className="text-base text-[#101010]"
              style={GlobalStyles.fontBold}
            >
              Book
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
