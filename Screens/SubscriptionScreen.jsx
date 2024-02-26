import { View, Text, Pressable } from "react-native";
import React from "react";
import { ArrowLeft } from "iconsax-react-native";
import { ScrollView } from "react-native-gesture-handler";

const SubscriptionScreen = ({ navigation }) => {
  const subsctiption = [
    {
      title: "Basic",
      sub: "Free",
      desc: "Experience the full spectrum of our app, minus the premium exclusives!",
      additionalClasses: "px-3 py-0.5",
      additionalSubscriptionClasses: "bg-[#262626]",
      additionalSubClasses: "",
    },
    {
      title: "White Diamond",
      sub: "₹1999",
      desc: "Unlock the Standard Access and in-app features",
      additionalClasses: "border border-white px-3 py-0.5 rounded-full",
      additionalSubscriptionClasses:
        "bg-[#191919] border border-white opacity-40",
      additionalSubClasses: "",
    },
    {
      title: "Blue Diamond",
      sub: "₹6999",
      desc: "Limited VIP Access to Events & Parties, Limited Premium Features",
      additionalClasses: "bg-indigo-700 px-3 py-0.5 rounded-full",
      additionalSubscriptionClasses:
        "bg-[#161616] border border-indigo-700 opacity-40",
      additionalSubClasses: "",
    },
    {
      title: "Black Diamond",
      sub: "₹14999",
      desc: "VIP Access to Event and Parties, Priority Booking, Dedicated Concierge",
      additionalClasses: "bg-[#E9FA00] px-3 py-0.5 rounded-full",
      additionalSubscriptionClasses:
        "bg-[#000] border border-[#E9FA00] opacity-40",
      additionalSubClasses: "text-black",
    },
  ];
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
            My Subscriptions
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
          <View className="">
            <Text
              className="text-white text-2xl text-center mb-5"
              style={GlobalStyles.fontSemiBold}
            >
              Explore all the Subscriptions
            </Text>

            {subsctiption.map((item) => {
              return (
                <View
                  key={item?.title}
                  className={`${item?.additionalSubscriptionClasses} p-3 rounded-xl w-full my-2`}
                >
                  <View className="flex-row justify-between items-center">
                    <Text
                      className="text-white text-lg"
                      style={GlobalStyles.fontSemiBold}
                    >
                      {item?.title}
                    </Text>

                    <Badge
                      additionalClasses={item?.additionalClasses}
                      additionalSubClasses={item?.additionalSubClasses}
                      sub={item?.sub}
                    />
                  </View>

                  <Text
                    className="text-white mt-3 text-base"
                    style={GlobalStyles.fontMedium}
                  >
                    {item?.desc}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="px-4 pb-6">
          <Pressable
            className="bg-[#FF26B9] active:bg-[#bb3691] w-full py-3 mt-3 mb-5 rounded-2xl"
            onPress={() => navigation.navigate("Index")}
          >
            <Text className="text-white text-xl font-semibold text-center">
              Change Membership
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;

const Badge = ({ additionalClasses, additionalSubClasses, sub }) => {
  return (
    <View className={`${additionalClasses}`}>
      <Text
        className={`text-base text-white ${additionalSubClasses}`}
        style={GlobalStyles.fontSemiBold}
      >
        {sub}
      </Text>
    </View>
  );
};
