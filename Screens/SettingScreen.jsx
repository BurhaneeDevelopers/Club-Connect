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
      icon: <ShieldTick size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "Notification",
      icon: <Notification1 size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "Privacy",
      icon: <Lock1 size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACCOUNT",
      title: "Wallet",
      icon: <Gift size="24" color="#FF26B9" variant="Broken" />,
      redirectTo: "",
    },
    {
      category: "ACCOUNT",
      title: "My activity",
      icon: <Clock size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "SUPPORT",
      title: "My subscription",
      icon: <BitcoinCard size="24" color="#FF26B9" variant="Broken" />,
      badge: true,
      redirectTo: "Subscription",
    },
    {
      category: "SUPPORT",
      title: "Help & Support",
      icon: <I24Support size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "SUPPORT",
      title: "Terms & Policies",
      icon: <InfoCircle size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACTIONS",
      title: "Report a problem",
      icon: <Danger size="24" color="#FF26B9" variant="Broken" />,
    },
    {
      category: "ACTIONS",
      title: "Add account",
      icon: <AddCircle size="24" color="#FF26B9" variant="Broken" />,
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
      className="h-screen w-screen items-center justify-center mx-auto"
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
            className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
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
            <View className="px-3 py-2 bg-[#262626] rounded-xl">
              {SettingsTitle.filter((item) => item.category === category).map(
                (item, index) => (
                  <View key={item.title}>
                    <SettingTitle
                      key={index}
                      title={item?.title}
                      icon={item?.icon}
                      navigation={navigation}
                      badge={item?.badge}
                      redirectTo={item?.redirectTo}
                    />
                  </View>
                )
              )}
            </View>
          </View>
        ))}

        <View className="px-4 pb-6">
          <Pressable
            onPress={handleSignOut}
            className="bg-[#FF26B9] active:bg-[#bb3691] w-full py-2 mt-3 mb-5 rounded-xl"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingScreen;

const SettingTitle = ({ title, icon, navigation, badge, redirectTo }) => {
  return (
    <Pressable
      className="flex-row justify-between items-center"
      onPress={() => navigation.navigate(redirectTo)}
    >
      <View className="flex-row items-center space-x-2 my-3">
        {icon}

        <Text
          className="text-[#f9f9f9] text-base"
          style={GlobalStyles.fontRegular}
        >
          {title}
        </Text>
      </View>

      {badge && (
        <View className="bg-[#E9FA00] p-1 px-2 rounded-md">
          <Text style={GlobalStyles.fontMedium} className="text-xs">New</Text>
        </View>
      )}
    </Pressable>
  );
};
