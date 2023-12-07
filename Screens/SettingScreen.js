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
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({ navigation }) => {
  const SettingsTitle = [
    {
      category: "ACCOUNT",
      title: "Security",
      icon: <ShieldTick size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "Notification",
      icon: <Notification1 size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "Privacy",
      icon: <Lock1 size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "Wallet",
      icon: <Gift size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "My Acitvity",
      icon: <Clock size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "SUPPORT",
      title: "My Subscription",
      icon: <BitcoinCard size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "SUPPORT",
      title: "Help and Support",
      icon: <I24Support size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "SUPPORT",
      title: "Terms & Policies",
      icon: <InfoCircle size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACTIONS",
      title: "Report a Problem",
      icon: <Danger size="28" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACTIONS",
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
    AsyncStorage.clear();
    AsyncStorage.setItem("hasSignedIn", "");
    auth
      .signOut()
      .then(() => {
        navigation.replace("UnAuthenticate", {
          screen: "SignIn",
        });
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
            Settings
          </Text>
        </View>

        {categories.map((category) => (
          <View key={category} className="px-3 py-2">
            <Text
              className="text-[#f9f9f9] text-base pb-3"
              style={GlobalStyles.fontMedium}
            >
              {category}
            </Text>
            <View className="px-3 py-2 bg-[#0b0b0b] rounded-xl">
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

        <View className="px-4">
          <Pressable
            onPress={handleSignOut}
            className="bg-[#ff0000] active:bg-[#e14242] w-full py-3 mt-5 mb-5 rounded-2xl"
          >
            <Text className="text-white text-xl font-semibold text-center">Sign Out</Text>
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
          className="text-[#FF26B9] text-xl"
          style={GlobalStyles.fontRegular}
          onPress={() => navigation.navigate("Wallet")}
        >
          {title}
        </Text>
      </View>
    </>
  );
};
