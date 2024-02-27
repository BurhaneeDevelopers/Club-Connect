import React from "react";
import { Text, View, Image, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home3, People, EmptyWallet, TicketStar } from "iconsax-react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Audio } from "expo-av";

// Contexts
import { UserProvider } from "./context/UserContext";
import { UserContextProvider } from "./context/UserContextProvider";
import { UserDetailsContext } from "./context/UserDetailsContext";
import { UserDetailsProvider } from "./context/UserDetailsContext";
import { useContext } from "react";

// ICONS
import Castle from "./assets/icons/Castle.svg";
import CastleBold from "./assets/icons/CastleBold.svg";

//SCREENS
// Tab Screens
import HomeScreen from "./Screens/HomeScreen";
import EventsScreen from "./Screens/EventsScreen";
import CommunityScreen from "./Screens/CommunityScreen";
import VibeCityScreen from "./Screens/VibeCityScreen";
import ExploreScreen from "./Screens/ExploreScreen";

// Stack Screens
import WelcomeScreen from "./Screens/WelcomeScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import EmailConfirmation from "./Screens/EmailConfirmation";
import SignInScreen from "./Screens/SignInScreen";
import LocationPickScreen from "./Screens/LocationPickScreen";
import CitiesListScreen from "./Screens/CitiesListScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ProfileEditScreen from "./Screens/ProfileEditScreen";
import SettingScreen from "./Screens/SettingScreen";
import WalletScreen from "./Screens/WalletScreen";
import CafeExploreScreen from "./Screens/CafeExploreScreen";
import GlobalDetailsScreen from "./Screens/GlobalScreens/GlobalDetailsScreen";
import HotspotExplore from "./Screens/HotspotExplore";
import BarsExploreScreen from "./Screens/BarsExploreScreen";
import PubsExploreScreen from "./Screens/PubsExploreScreen";
import HostWithUsScreen from "./Screens/HostWithUsScreen";
import HugeAudienceScreen from "./Screens/HugeAudienceScreen";
import VhsFestScreen from "./Screens/VhsFestScreen";
import MessageListScreen from "./Screens/MessageListScreen";
import ChatScreen from "./Screens/ChatScreen";
import SetChatLockScreen from "./Screens/SetChatLockScreen";
import GlobalProfileScreen from "./Screens/GlobalScreens/GlobalProfileScreen";
import GlobalPostDetailsScreen from "./Screens/GlobalScreens/GlobalPostDetailsScreen";
import ClubScreen from "./Screens/ClubScreen";
import LoungeExploreScreen from "./Screens/LoungeExploreScreen";
import ClubsScreen from "./Screens/ClubsScreen";
import JoinClubScreen from "./Screens/JoinClubScreen";
import FollowersListScreen from "./Screens/FollowersListScreen";
import NotificationScreen from "./Screens/NotificationScreen";
import PaymentScreen from "./Screens/PaymentScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";

// FONTS LOADING
import { useFonts } from "expo-font";
import SubscriptionScreen from "./Screens/SubscriptionScreen";
import InviteVibersScreen from "./Screens/InviteVibersScreen";
import IntroVideo from "./Screens/IntroVideo";
import CalendarScreen from "./Screens/CalendarScreen";

// Default Theme
const navTheme = DefaultTheme;
navTheme.colors.background = "#000000";

// TAB BOTTOM NAVIGATOR
const StackScreen = ({ appdata }) => {
  return <TabNavigator Tab={Tab} />;
};

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Index"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {(props) => <StackScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="UnAuthenticate"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {(props) => <UnauthenticatedNavigator {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="VibeCity"
        component={VibeCityScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="HotspotExplore"
        component={HotspotExplore}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="CafeExplore"
        component={CafeExploreScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="GlobalDetails"
        component={GlobalDetailsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="BarsExplore"
        component={BarsExploreScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="LoungeExplore"
        component={LoungeExploreScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="PubsExplore"
        component={PubsExploreScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="EventScreen"
        component={EventsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="HostWithUs"
        component={HostWithUsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="MessageList"
        component={MessageListScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="SetChatLock"
        component={SetChatLockScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="HugeAudience"
        component={HugeAudienceScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="VhsFest"
        component={VhsFestScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="InviteVibers"
        component={InviteVibersScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="GlobalProfile"
        component={GlobalProfileScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="GlobalPosts"
        component={GlobalPostDetailsScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="ClubScreen"
        component={ClubScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="JoinClub"
        component={JoinClubScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="FollowersList"
        component={FollowersListScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
      />
    </Stack.Navigator>
  );
};

const UnauthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IntroVideo"
        component={IntroVideo}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Authenticate"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {(props) => <AuthenticatedNavigator {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmation}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="LocationPick"
        component={LocationPickScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="CitiesList"
        component={CitiesListScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Livvic-Regular": require("./assets/fonts/Livvic-Regular.ttf"),
    "Livvic-Medium": require("./assets/fonts/Livvic-Medium.ttf"),
    "Livvic-SemiBold": require("./assets/fonts/Livvic-SemiBold.ttf"),
    "Livvic-Bold": require("./assets/fonts/Livvic-Bold.ttf"),
    "Livvic-Black": require("./assets/fonts/Livvic-Black.ttf"),
    "Livvic-Light": require("./assets/fonts/Livvic-Light.ttf"),
  });

  const [user, setUser] = useState(false);

  const setUserSignedIn = async () => {
    try {
      const hasSignedIn = await AsyncStorage.getItem("hasSignedIn");
      setUser(hasSignedIn);
    } catch (error) {
      console.error("Error checking authentication state:", error);
    }
  };

  useEffect(() => {
    setUserSignedIn();
  }, []);

  // MUSIC SOUND
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/Music/VibeHai.mp3"),
      {
        progressUpdateIntervalMillis: 500,
        shouldPlay: false,
        shouldCorrectPitch: true,
        volume: 0.2,
        isMuted: false,
        isLooping: true,
      }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    playSound();
  }, []);

  if (fontsLoaded) {
    return (
      <ContextProviders>
        <UserDetailsProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar
              animated={true}
              backgroundColor="#000000"
              // barStyle="dark-content"
            />

            {user ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
          </NavigationContainer>
        </UserDetailsProvider>
      </ContextProviders>
    );
  } else {
    return null;
  }
}

const ContextProviders = ({ children }) => {
  return (
    <UserProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </UserProvider>
  );
};

const TabNavigator = ({ Tab }) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 90,
            backgroundColor: "#000000",
            // borderTopLeftRadius: 24,
            // borderTopRightRadius: 24,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        {/* Home Screen  */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: { display: "none" },
            ...TransitionPresets.SlideFromRightIOS,
            tabBarIcon: ({ focused, size }) => {
              return (
                <View className="items-center">
                  {focused ? (
                    <>
                      <Home3 size="32" color="#FF26B9" variant="Bold" />
                      <Text
                        className={`translate-y-1 text-[#FF26B9] text-center , ${
                          focused ? "font-bold" : ""
                        }`}
                      >
                        Home
                      </Text>
                    </>
                  ) : (
                    <>
                      <Home3 size="32" color="#f9f9f9" />
                      <Text
                        className={`translate-y-1 text-[#f9f9f9] text-center , ${
                          focused ? "" : ""
                        }`}
                      >
                        Home
                      </Text>
                    </>
                  )}
                </View>
              );
            },
          }}
        />

        {/* Events Screen  */}
        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: { display: "none" },
            ...TransitionPresets.SlideFromRightIOS,
            tabBarIcon: ({ focused, size }) => {
              return (
                <View className="items-center">
                  {focused ? (
                    <>
                      <TicketStar
                        size="32"
                        color="#FF26B9"
                        variant="Bold"
                        className="my-auto"
                      />
                      <Text
                        className={`translate-y-1 text-[#FF26B9] text-center , ${
                          focused ? "font-bold" : ""
                        }`}
                      >
                        Events
                      </Text>
                    </>
                  ) : (
                    <>
                      <TicketStar
                        size="32"
                        color="#f9f9f9"
                        className="my-auto"
                      />
                      <Text
                        className={`translate-y-1 text-[#f9f9f9] text-center , ${
                          focused ? "" : ""
                        }`}
                      >
                        Events
                      </Text>
                    </>
                  )}
                </View>
              );
            },
          }}
        />

        {/* Events Screen  */}
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: { display: "none" },
            ...TransitionPresets.ModalSlideFromBottomIOS,
            tabBarIcon: ({ focused, size }) => {
              return (
                <View className="items-center">
                  {focused ? (
                    <View
                      className="bg-[#FF26B9] p-3 flex-col items-center justify-center rounded-full"
                      style={{
                        shadowColor: "#fff",
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.21,
                        shadowRadius: 8.19,
                        elevation: 32,
                        // backgroundColor: "#0000",
                      }}
                    >
                      <People size="32" color="#fff" className="my-auto" />
                    </View>
                  ) : (
                    <View className="bg-[#E9FA00] p-3 flex-col items-center justify-center rounded-full">
                      <People size="32" color="#000000" className="my-auto" />
                    </View>
                  )}
                </View>
              );
            },
          }}
        />

        {/* Notifications Screen  */}
        <Tab.Screen
          name="VibeCity"
          component={VibeCityScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: { display: "none" },
            ...TransitionPresets.SlideFromRightIOS,
            tabBarIcon: ({ focused, size }) => {
              return (
                <View className="items-center">
                  {focused ? (
                    <>
                      {/* <Notification size="32" color="#FF26B9" variant="Bold" /> */}
                      <CastleBold width={32} height={32} fill={"#FF26B9"} />
                      <Text
                        className={`translate-y-1 text-[#FF26B9] text-center , ${
                          focused ? "font-bold" : ""
                        }`}
                      >
                        VibeCity
                      </Text>
                    </>
                  ) : (
                    <>
                      <Castle width={32} height={32} fill={"#f9f9f9"} />
                      <Text
                        className={`translate-y-1 text-[#f9f9f9] text-center , ${
                          focused ? "" : ""
                        }`}
                      >
                        VibeCity
                      </Text>
                    </>
                  )}
                </View>
              );
            },
          }}
        />

        {/* Cart Screen  */}
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: { display: "none" },
            ...TransitionPresets.SlideFromRightIOS,
            tabBarIcon: ({ focused, size }) => {
              return (
                <View className="items-center">
                  {focused ? (
                    <>
                      <EmptyWallet size="32" color="#FF26B9" variant="Bold" />
                      <Text
                        className={`translate-y-1 text-[#FF26B9] text-center , ${
                          focused ? "font-bold" : ""
                        }`}
                      >
                        Wallet
                      </Text>
                    </>
                  ) : (
                    <>
                      <EmptyWallet size="32" color="#f9f9f9" />
                      <Text
                        className={`translate-y-1 text-[#f9f9f9] text-center , ${
                          focused ? "" : ""
                        }`}
                      >
                        Wallet
                      </Text>
                    </>
                  )}
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};
