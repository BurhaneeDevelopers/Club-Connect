import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useState, useEffect, useRef } from "react";
// import axios from "axios";
import { reverseGeocodeAsync } from "expo-location";

// ICONS
import { ArrowLeft } from "iconsax-react-native";
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";
import useLocation from "../Hooks/useLocation";

const LocationPickScreen = ({ navigation }) => {
  const { updateLiveLocation } = useLocation();

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
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liveLocation, setLiveLocation] = useState("");

  const { saveCordinates } = useLocation();

  const handleLocationRequest = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Use reverseGeocodeAsync to get address information
      const address = await reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      console.log(
        "Address:",
        location.coords.latitude,
        location.coords.longitude
      );

      const newLatitude = location.coords.latitude; // New latitude value
      const newLongitude = location.coords.longitude; // New longitude value
      saveCordinates(newLatitude, newLongitude);

      // Get the first address from the array
      const firstAddress = address[0];

      setLiveLocation(firstAddress);
      setLoading(false);

      setTimeout(() => {
        navigation.navigate("Authenticate");
      }, 1000);
    } catch (error) {
      console.error("Error getting location:", error);
      setLoading(false);
    }
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
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
            className="bg-[#FF26B9] active:bg-[#FF26B9]/70 w-full p-3 rounded-lg flex-row justify-center items-center space-x-3"
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

          <Text
            className="text-[#F3EBD5] text-lg text-center"
            style={GlobalStyles.fontMedium}
            onPress={clearCache}
          >
            Clear Cache
          </Text>
        </View>
      </View>
      {liveLocation && (
        <View className="absolute bottom-10 w-72">
          <Text className="text-center" style={GlobalStyles.fontMedium}>
            <Text className="text-[#FF26B9]">
              Live Location Fetched: &nbsp;
            </Text>
            <Text className="text-[#f9f9f9]">
              {liveLocation.name}, {liveLocation.street},&nbsp;
              {liveLocation.district},&nbsp;
              {liveLocation.city}, {liveLocation.region},&nbsp;
              {liveLocation.postalCode}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default LocationPickScreen;
