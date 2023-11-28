import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Modal,
} from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HotDealsSlider from "../Components/HotDealsSlider";
import {
  SearchNormal1,
  Buildings2,
  Coffee,
  Building,
  Shop,
  Location,
  Gift,
  Bill,
  Add,
} from "iconsax-react-native";
import LottieView from "lottie-react-native";
import FeaturedHomeRow from "../Components/FeaturedHomerow";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

// Contexts
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

// Components
import SectionTitles from "../Components/SectionTitles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";

// SANITY
import client from "../sanity";

// RN ELEMENTS
import { Skeleton } from "@rneui/themed";

const VibeCityScreen = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="w-full h-full">
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} className="rounded-3xl mx-auto" />
      )}
      <FloatingCameraButton pickImage={pickImage} />
    </SafeAreaView>
  );
};

export default VibeCityScreen;

const FloatingCameraButton = ({ pickImage }) => {
  return (
    <Pressable
      className="flex-row items-center justify-center bg-[#FF26B9] active:bg-[#bb3691] rounded-full w-16 h-16 absolute right-10 bottom-10 z-50"
      onPress={() => {
        pickImage();
        console.log("clicked");
      }}
    >
      <Add color="#fff" variant="Outline" size="44" />
    </Pressable>
  );
};
