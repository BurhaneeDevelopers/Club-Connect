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
import { ArrowLeft, Camera } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";

import { getAuth, signOut } from "@firebase/auth";
import app from "../firebase";

// ICONS
import {
  ShieldTick,
  Notification1,
  Lock1,
  Gift,
  Clock,
  BitcoinCard,
  I24Support,
  InfoCircle,
  Danger,
  AddCircle,
} from "iconsax-react-native";

const SettingScreen = ({ navigation }) => {
  const SettingsTitle = [
    {
      category: "Account",
      title: "Security",
      icon: <ShieldTick size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Account",
      title: "Notification",
      icon: <Notification1 size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Account",
      title: "Privacy",
      icon: <Lock1 size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Account",
      title: "Wallet",
      icon: <Gift size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Account",
      title: "My Acitvity",
      icon: <Clock size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Support & About",
      title: "My Subscription",
      icon: <BitcoinCard size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Support & About",
      title: "Help and Support",
      icon: <I24Support size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Support & About",
      title: "Terms & Policies",
      icon: <InfoCircle size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Actions",
      title: "Report a Problem",
      icon: <Danger size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "Actions",
      title: "Add Account",
      icon: <AddCircle size="28" color="#FF26B9" variant="Broken" />,
    },
  ];

  const categories = [
    ...new Set(SettingsTitle.map((setting) => setting.category)),
  ];

  // SIGN OUT
  const auth = getAuth();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("SignIn");
      })
      .catch((error) => alert(error.message));
  };

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
            Setting
          </Text>
        </View>

        {categories.map((category) => (
          <View key={category} className="px-5 py-3">
            <Text
              className="text-[#f9f9f9] text-xl"
              style={GlobalStyles.fontMedium}
            >
              {category}
            </Text>
            <View className="p-5">
              {SettingsTitle.filter((item) => item.category === category).map(
                (item, index) => (
                  <View key={item.title}>
                    <SettingTitle
                      key={index}
                      title={item.title}
                      icon={item.icon}
                      navigation={navigation}
                    />
                  </View>
                )
              )}
            </View>
          </View>
        ))}

        <View className="px-5">
          <Pressable
            onPress={handleSignOut}
            className="bg-[#ff0000] active:bg-[#e14242] w-full py-3 mb-5 rounded-xl"
          >
            <Text className="text-white text-2xl text-center">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingScreen;

const SettingTitle = ({ title, icon, navigation }) => {
  return (
    <>
      <View className="flex-row items-center space-x-2 my-3">
        {icon}

        <Text
          className="text-[#FF26B9] text-2xl"
          style={GlobalStyles.fontRegular}
          onPress={() => navigation.navigate("Wallet")}
        >
          {title}
        </Text>
      </View>
    </>
  );
};
