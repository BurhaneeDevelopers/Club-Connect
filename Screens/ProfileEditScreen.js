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

// Contexts
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";
import ProfileEditInputs from "../Components/ProfileEditInputs";
import RBSheet from "react-native-raw-bottom-sheet";

const ProfileEditScreen = ({ navigation }) => {
  // FETCH EDITED PROFILE DATA
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);
  const [success, setSuccess] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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
        const docRef = doc(db, "users", auth.currentUser.uid);
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

  // To check if user has already saved data or not
  const isUserDataSaved = useMemo(
    () =>
      name !== null &&
      userName !== null &&
      bio !== null &&
      location !== null &&
      profileImage !== null,
    [name, userName, bio, location, profileImage]
  );

  // Save data in DB and in CONTEXT
  const handleSaveData = useMemo(
    () => async () => {
      setLoading(true);
      try {
        const imageUrl = await uploadImage();
        setProfileImage(imageUrl);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
          name: name,
          userName: userName,
          bio: bio,
          location: location,
          profileImage: profileImage.uri,
        });

        // Update the context with the new user details
        setUserDetails({
          name: name,
          userName: userName,
          bio: bio,
          location: location,
          profileImage: profileImage.uri,
        });

        console.log("Saved Data");
        setLoading(false);
        setSuccess(true);

        // Log the updated user details after setting the state
        console.log(userDetails);
      } catch (error) {
        console.log(error);
      }
    },
    [
      name,
      userName,
      bio,
      location,
      auth.currentUser.uid,
      setSuccess,
      setLoading,
      setUserDetails,
      userDetails,
    ]
  );

  // Update data in DB and in CONTEXT
  const handleUpdateData = useMemo(
    () => async () => {
      setLoading(true);

      try {
        const imageUrl = await uploadImage();
        setProfileImage(imageUrl);

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          name: name,
          userName: userName,
          bio: bio,
          location: location,
          profileImage: profileImage.uri,
        });

        // Update the context with the new user details
        setUserDetails({
          name: name,
          userName: userName,
          bio: bio,
          location: location,
          profileImage: profileImage.uri,
        });

        console.log("Updated Data");
        setLoading(false);
        setSuccess(true);

        // Log the updated user details after setting the state
        console.log(userDetails);
      } catch (error) {
        console.log("Uploading Image Failed: ", error);
      }
    },
    [
      name,
      userName,
      bio,
      location,
      auth.currentUser.uid,
      setSuccess,
      setLoading,
      setUserDetails,
      userDetails,
    ]
  );

  // To open BottomSheet
  const refRBSheet = useRef();

  // Function to handle image upload
  const pickImage = async () => {
    setLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      console.log(source);
      setImage(source);
      setProfileImage(source);
      setLoading(false);
    }
  };

  // Function to handle image upload and return the download URL
  const uploadImage = async () => {
    try {
      setUploading(true);
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const storageRef = ref(getStorage(), fileName);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      await uploadTask;

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      setUploading(false);
      alert("Photo Uploaded");
      setProfileImage(null);
      setImage(null);

      return downloadURL;
    } catch (error) {
      console.log(error);
      setUploading(false);
      return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto px-5"
    >
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
            className="text-3xl text-[#FF26B9] mx-auto"
            style={GlobalStyles.fontSemiBold}
          >
            Edit Profile
          </Text>
        </View>

        <View className="space-y-2 justify-center items-center my-5">
          {image ? (
            <Image
              source={{ uri: image.uri }}
              className="w-44 h-44 rounded-full"
            />
          ) : profileImage ? (
            <Image
              source={{ uri: profileImage }}
              className="w-44 h-44 rounded-full"
            />
          ) : (
            <Image
              source={require("../assets/Illustrations/Avatar.jpg")}
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

        <View className="p-5 flex-row justify-center items-center space-x-5">
          <Pressable
            className="w-40 bg-[#FF26B9] active:bg-[#FF26B9]/70 p-3 rounded-lg items-center"
            onPress={isUserDataSaved ? handleUpdateData : handleSaveData}
          >
            <Text
              className="text-[#f9f9f9] text-lg"
              style={GlobalStyles.fontMedium}
            >
              Save Changes
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;