import { View, Text, Pressable } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ArrowLeft } from "iconsax-react-native";

const PaymentScreen = ({ navigation }) => {
  return (
    <View className="h-screen w-screen items-center justify-center mx-auto">
      <ScrollView>
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
            Payment
          </Text>
        </View>

        <View className="px-4 pb-6">
          <Pressable
            className="bg-[#FF26B9] active:bg-[#bb3691] w-full py-3 mt-3 mb-5 rounded-2xl"
            onPress={() => navigation.navigate("Payment")}
          >
            <Text className="text-white text-xl font-semibold text-center">
              Pay the amount
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;
