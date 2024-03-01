import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  // RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Camera } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import { useState, useEffect, useMemo, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import LottieView from "lottie-react-native";

// Contexts
import ProfileEditInputs from "../Components/ProfileEditInputs";
import RBSheet from "react-native-raw-bottom-sheet";
import useAuth from "../Hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileEditScreen = ({ navigation }) => {
  // FETCH EDITED PROFILE DATA
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);

  const { user, setUser } = useAuth();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  // CONFETTI HERE
  // FIRE CONFETTI when user signs In for the first Time anonymously
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const animation = useRef(null);

  const handleAnimationFinish = () => {
    setAnimationPlayed(true);
  };

  useEffect(() => {
    // Check if the animation has already been played
    if (!animationPlayed) {
      AsyncStorage.getItem("playAnimation")
        .then((playAnimation) => {
          if (playAnimation === "true") {
            // Play the animation
            animation.current?.play();

            AsyncStorage.setItem("playAnimation", "false");
          }
        })
        .catch((error) => {
          console.error("Error checking AsyncStorage:", error);
        });
    }
  }, [animationPlayed]);

  const auth = getAuth();
  useEffect(() => {
    const cleanup = () => {
      // Reset state when component unmounts
      setName(null);
      setUserName(null);
      setBio(null);
      setLocation(null);
      setProfileImage(null);
      setSuccess(false);
    };

    const ReadData = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "allUsers", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setUserName(docSnap.data().userName);
          setBio(docSnap.data().bio);
          setLocation(docSnap.data().location);
          setProfileImage(docSnap.data().profileImage);
          setLoading(false);
        }
      } catch (error) {
        if (error.code === "unavailable") {
          // Show an alert for poor internet quality when the client is offline
          alert("Poor internet quality. Please check your connection.");
        } else {
          // Handle other errors if needed
        }
      }
    };

    ReadData();

    // Cleanup function will be called when the component unmounts
    return cleanup;
  }, [auth.currentUser.uid]);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // uploadImage();
    }
  };

  // Function to handle image upload and return the download URL
  const uploadImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(
        getStorage(),
        `ProfileImage/${auth.currentUser.uid}`
      );
      const uploadTask = uploadBytesResumable(storageRef, blob);
 
      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      console.log("Download URL is:", downloadURL);
      setDownloadURL(downloadURL);

      setLoading(false);

      return downloadURL;
    } catch (error) {
      console.log("Error is", error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (image !== null) {
      // Call the uploadImage function only when the image state is updated
      uploadImage();
    }
    console.log("Current image:", image);
  }, [image]);

  // Update data in DB and in CONTEXT
  const handleUpdateData = async () => {
    setLoading(true);
    try {
      console.log("IMAGE URL ISSSSSSSSSSs", downloadURL);

      const userDocRef = doc(db, "allUsers", auth.currentUser.uid);

      await updateDoc(userDocRef, {
        name: name,
        userName: userName,
        bio: bio,
        location: location,
        profileImage: downloadURL,
      });
      // Update the context with the new user details
      setUser({
        name: name,
        userName: userName,
        bio: bio,
        location: location,
        profileImage: downloadURL,
      });

      setSuccess(true);
      setAnimationPlayed(!animationPlayed);
      console.log("Updated Data");
      setLoading(false);
      setAnimationPlayed(false);

      // Log the updated user details after setting the state
      console.log(user);
    } catch (error) {
      console.log("Uploading Image Failed: ", error);
    }
  };

  // To open BottomSheet
  const refRBSheet = useRef();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
        className="h-screen w-screen items-center justify-center mx-auto px-1"
      >
        {!animationPlayed && (
          <LottieView
            ref={animation}
            loop={false}
            autoPlay={false}
            onAnimationFinish={handleAnimationFinish}
            className={`w-[700px] h-[1000px] absolute left-0 items-start justify-start top-0 -translate-x-20 ${
              !animationPlayed ? "" : ""
            }`}
            source={require("../assets/Illustrations/confetti.json")}
          />
        )}

        <RBSheet
          customStyles={{
            draggableIcon: { display: "none" },
          }}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          // height={150}
          className="h-screen"
        >
          <View className="bg-white w-screen rounded-t-xl">
            <Pressable
              className="bg-[#E2E3F0] mx-auto top-3 h-1 w-12 rounded-full"
              onPress={() => refRBSheet.current.close()}
            ></Pressable>

            <TouchableOpacity activeOpacity={1} className="mt-10">
              <Text>Hello</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

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
              Edit profile
            </Text>
          </View>

          <View className="space-y-2 justify-center items-center my-3">
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-44 h-44 rounded-full"
              />
            ) : profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-44 h-44 rounded-full"
              />
            ) : (
              <Image
                source={require("../assets/Images/User/Dummy-Profile.png")}
                className="w-44 h-44 rounded-full"
              />
            )}

            <Pressable
              className="bg-[#FF26B9] w-14 h-14 rounded-full absolute bottom-0 translate-x-14 justify-center items-center"
              onPress={pickImage}
            >
              <Camera size="36" color="#f9f9f9" />
            </Pressable>
          </View>

          <ProfileEditInputs
            states={{
              name: name,
              setName: setName,
              userName: userName,
              setUserName: setUserName,
              bio: bio,
              setBio: setBio,
              location: location,
              setLocation: setLocation,
            }}
          />

          {success && (
            <Text
              className="text-[#E9FA00] px-5 mt-2"
              style={GlobalStyles.fontMedium}
            >
              Hoorraayy!! Profile Saved Successfuly!
            </Text>
          )}

          {loading && (
            <>
              <ActivityIndicator color="#E9FA00" size={24} />
            </>
          )}

          <View className="py-4 flex-row justify-center items-center space-x-5">
            <Pressable
              className="w-40 bg-[#FF26B9] active:bg-[#FF26B9]/70 py-3 rounded-2xl items-center"
              onPress={() => {
                handleUpdateData();
                setAnimationPlayed(true);
              }}
            >
              <Text
                className="text-[#f9f9f9] text-xl font-semibold"
                style={GlobalStyles.fontMedium}
              >
                Save changes
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
