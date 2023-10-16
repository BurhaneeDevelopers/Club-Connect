import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";

// ICONS
import { ArrowLeft } from "iconsax-react-native";
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";

const LocationPickScreen = ({ navigation }) => {
  const clearCache = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Cache cleared successfully.");
    } catch (error) {
      console.log("Error clearing cache:", error);
    }
  };

  // GET USERS LIVE LOCATION
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationRequest = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    setLoading(true);
    if (status === "granted") {
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      setErrorMsg(null);

      // Reverse geocode the coordinates to get the address using Nominatim
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}`
        );
        if (response.data.display_name) {
          setAddress(response.data.display_name);
          setLoading(false);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        setAddress("Error fetching address");
      }
      console.log(status);
    } else {
      setErrorMsg("Permission to access location was denied");
    }
  };

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = ` ${address}`;
  }

  return (
    <View className="px-5 items-center h-screen justify-center text-center">
      <View className="absolute top-0 flex-row justify-between w-full items-center my-5">
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#f9f9f9" />
        </Pressable>
        <AuthSparklePink width={64} height={64} />
      </View>
      <View className="">
        <Text
          className="text-white text-4xl text-center"
          style={GlobalStyles.fontBlack}
        >
          See What's On Near You
        </Text>
        <Text
          className="text-[#f9f9f9] text-lg text-center"
          style={GlobalStyles.fontMedium}
        >
          Pick an area!
        </Text>

        <View className="my-5 space-y-1">
          <Pressable
            className="bg-[#FF26B9] w-full p-3 rounded-lg flex-row justify-center items-center space-x-3"
            onPress={handleLocationRequest}
          >
            {loading ? (
              <View>
                <ActivityIndicator size={20} color="#EADAAA" />
              </View>
            ) : null}

            <Text
              className="text-[#f9f9f9] text-lg"
              style={GlobalStyles.fontMedium}
            >
              Use Current Location
            </Text>
          </Pressable>

          <Text
            className="text-[#FF26B9] text-lg text-center"
            style={GlobalStyles.fontMedium}
            onPress={() => navigation.navigate("CitiesList")}
          >
            Choose Location!
          </Text>

          {/* <Text
            className="text-[#F3EBD5] text-lg text-center"
            style={GlobalStyles.fontMedium}
            onPress={clearCache}
          >
            Clear Cache
          </Text> */}
        </View>
      </View>
      {location && (
        <View className="absolute bottom-10 w-72">
          <Text className="text-center" style={GlobalStyles.fontMedium}>
            <Text className="text-[#FF26B9]">Location Fetched:</Text>
            <Text className="text-[#f9f9f9]">{text}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default LocationPickScreen;
