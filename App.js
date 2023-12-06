import React from "react";
import { Text, View, Image, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home3,
  Calendar,
  People,
  Notification,
  ShoppingCart,
  Wallet,
  EmptyWallet,
  TicketStar,
} from "iconsax-react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

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
import CafeDetailsScreen from "./Screens/CafeDetailsScreen";
import RestaurantExplore from "./Screens/RestaurantExplore";
import RestaurantDetailsScreen from "./Screens/RestaurantDetailsScreen";
import HotspotExplore from "./Screens/HotspotExplore";
import BarsExploreScreen from "./Screens/BarsExploreScreen";
import PubsExploreScreen from "./Screens/PubsExploreScreen";
import HostWithUsScreen from "./Screens/HostWithUsScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth, { AuthProvider } from "./Hooks/useAuth";

// FONTS LOADING
import { useFonts } from "expo-font";

// Default Theme
const navTheme = DefaultTheme;
navTheme.colors.background = "#101010";

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
        name="CafeDetails"
        component={CafeDetailsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="RestaurantExplore"
        component={RestaurantExplore}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
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
    </Stack.Navigator>
  );
};

const UnauthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
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
  // const [fontsLoaded, setFontsLoaded] = useState(false);
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

  if (fontsLoaded) {
    return (
      <ContextProviders>
        <UserDetailsProvider>
          <NavigationContainer theme={navTheme}>
            <StatusBar
              animated={true}
              backgroundColor="#101010"
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
      <UserContextProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserContextProvider>
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
            backgroundColor: "#E9FA00",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
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
                      <Home3 size="32" color="#101010" />
                      <Text
                        className={`translate-y-1 text-[#101010] text-center , ${
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
                        color="#101010"
                        className="my-auto"
                      />
                      <Text
                        className={`translate-y-1 text-[#101010] text-center , ${
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
                        elevation: 32,
                        shadowColor: "#000",
                        shadowRadius: 2,
                      }}
                    >
                      <People size="32" color="#EADAAA" className="my-auto" />
                    </View>
                  ) : (
                    <View className="bg-[#101010] p-3 flex-col items-center justify-center rounded-full">
                      <People size="32" color="#F9F9F9" className="my-auto" />
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
                      <CastleBold width={32} height={32} />
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
                      <Castle width={32} height={32} />
                      <Text
                        className={`translate-y-1 text-[#101010] text-center , ${
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
                      <EmptyWallet size="32" color="#101010" />
                      <Text
                        className={`translate-y-1 text-[#101010] text-center , ${
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
