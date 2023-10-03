import React from "react";
import { Text, View, Image, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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

// FONTS LOADING
import { useFonts } from "expo-font";

// TAB BOTTOM NAVIGATOR
const StackScreen = ({ appdata }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 90,
          backgroundColor: "#D4AF37",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
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
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <Home3 size="32" color="#262223" variant="Bold" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Home
                    </Text>
                  </>
                ) : (
                  <>
                    <Home3 size="32" color="#262223" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
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
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <Calendar
                      size="32"
                      color="#262223"
                      variant="Bold"
                      className="my-auto"
                    />
                    <Text
                      className={`translate-y-1 text- text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Events
                    </Text>
                  </>
                ) : (
                  <>
                    <Calendar size="32" color="#262223" className="my-auto" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
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
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <View className="bg-[#262223] p-3 flex-col items-center justify-center rounded-full">
                    <People size="32" color="#D4AF37" className="my-auto" />
                  </View>
                ) : (
                  <View className="bg-[#FFDFB9] p-3 flex-col items-center justify-center rounded-full">
                    <People size="32" color="#262223" className="my-auto" />
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
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <Notification size="32" color="#262223" variant="Bold" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Notification
                    </Text>
                  </>
                ) : (
                  <>
                    <Notification size="32" color="#262223" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
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
          tabBarIcon: ({ focused, size }) => {
            return (
              <View className="items-center">
                {focused ? (
                  <>
                    <ShoppingCart size="32" color="#262223" variant="Bold" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
                        focused ? "font-bold" : ""
                      }`}
                    >
                      Cart
                    </Text>
                  </>
                ) : (
                  <>
                    <ShoppingCart size="32" color="#262223" />
                    <Text
                      className={`translate-y-1 text- text-center , ${
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
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor="#D4AF37"
            barStyle="dark-content"
          />
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Index"
              options={{
                headerShown: false,
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
