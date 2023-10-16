import React from "react";
import { Text, View, Image, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home3,
  Calendar,
  People,
  Notification,
  ShoppingCart,
} from "iconsax-react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

//SCREENS
// Tab Screens
import HomeScreen from "./Screens/HomeScreen";
import EventsScreen from "./Screens/EventsScreen";
import CommunityScreen from "./Screens/CommunityScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";
import CartScreen from "./Screens/CartScreen";

// Stack Screens
import WelcomeScreen from "./Screens/WelcomeScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import EmailConfirmation from "./Screens/EmailConfirmation";
import SignInScreen from "./Screens/SignInScreen";
import LocationPickScreen from "./Screens/LocationPickScreen";
import CitiesListScreen from "./Screens/CitiesListScreen";

// FONTS LOADING
import { useFonts } from "expo-font";

// Default Theme
const navTheme = DefaultTheme;
navTheme.colors.background = "#101010";

// TAB BOTTOM NAVIGATOR
const StackScreen = ({ appdata }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 90,
          backgroundColor: "#C8AE78",
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
                    <Home3 size="32" color="#272727" variant="Bold" />
                    <Text
                      className={`translate-y-1 text-[#f9f9f9] text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Home
                    </Text>
                  </>
                ) : (
                  <>
                    <Home3 size="32" color="#272727" />
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
                    <Calendar
                      size="32"
                      color="#272727"
                      variant="Bold"
                      className="my-auto"
                    />
                    <Text
                      className={`translate-y-1 text-[#f9f9f9] text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Events
                    </Text>
                  </>
                ) : (
                  <>
                    <Calendar size="32" color="#272727" className="my-auto" />
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
                      elevation: 32,
                      shadowColor: "#000",
                      shadowRadius: 2,
                    }}
                  >
                    <People size="32" color="#EADAAA" className="my-auto" />
                  </View>
                ) : (
                  <View className="bg-[#EADAAA] p-3 flex-col items-center justify-center rounded-full">
                    <People size="32" color="#272727" className="my-auto" />
                  </View>
                )}
              </View>
            );
          },
        }}
      />

      {/* Notifications Screen  */}
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { display: "none" },
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <Notification size="32" color="#272727" variant="Bold" />
                    <Text
                      className={`translate-y-1 text-[#f9f9f9] text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Notification
                    </Text>
                  </>
                ) : (
                  <>
                    <Notification size="32" color="#272727" />
                    <Text
                      className={`translate-y-1 text-[#f9f9f9] text-center , ${
                        focused ? "" : ""
                      }`}
                    >
                      Notification
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
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { display: "none" },
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <ShoppingCart size="32" color="#272727" variant="Bold" />
                    <Text
                      className={`translate-y-1 text-[#f9f9f9] text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Cart
                    </Text>
                  </>
                ) : (
                  <>
                    <ShoppingCart size="32" color="#272727" />
                    <Text
                      className={`translate-y-1 text-[#f9f9f9] text-center , ${
                        focused ? "" : ""
                      }`}
                    >
                      Cart
                    </Text>
                  </>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const Tab = createBottomTabNavigator();

export default function App() {
  const Stack = createStackNavigator();

  // const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    "Livvic-Regular": require("./assets/fonts/Livvic-Regular.ttf"),
    "Livvic-Medium": require("./assets/fonts/Livvic-Medium.ttf"),
    "Livvic-SemiBold": require("./assets/fonts/Livvic-SemiBold.ttf"),
    "Livvic-Bold": require("./assets/fonts/Livvic-Bold.ttf"),
    "Livvic-Black": require("./assets/fonts/Livvic-Black.ttf"),
    "Livvic-Light": require("./assets/fonts/Livvic-Light.ttf"),
  });

  if (fontsLoaded) {
    return (
      <>
        <NavigationContainer theme={navTheme}>
          <StatusBar
            animated={true}
            backgroundColor="#101010"
            // barStyle="dark-content"
          />
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
            <Stack.Screen
              name="Index"
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            >
              {(props) => <StackScreen {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  } else {
    return null;
  }
}
