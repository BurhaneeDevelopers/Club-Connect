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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, TicketStar } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";

// SVGS
import WalletCoin from "../assets/Illustrations/WalletCoin.svg";

const WalletScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto"
    >
      <ScrollView>
        <View className="flex-row w-full items-center p-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-3xl text-[#FF26B9] mx-auto"
            style={GlobalStyles.fontSemiBold}
          >
            My Wallet
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
                  3,210
                </Text>
                <View className="flex-row space-x-2 items-center">
                  <TicketStar size="24" color="#FF8A65" variant="Bold" />
                  <Text className="text-gray-200">Available Peso</Text>
                </View>
              </View>

              <View>
                <WalletCoin width={72} height={72} />
              </View>
            </View>

            <Pressable className="w-full p-3 rounded-lg items-center bg-[#FF26B9] active:bg-[#c52d95] mt-7">
              <Text className="text-[#f9f9f9] text-lg">Encash Peso</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WalletScreen;
