import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Setting2, Edit, Add } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import TabBar from "../Components/TabBar";
import { useState, useEffect } from "react";

// Context
import useAuth from "../Hooks/useAuth";
import usePosts from "../Hooks/posts/usePosts";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { db } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  const [post, setPosts] = useState(true);
  const [saved, setSaved] = useState(false);
  const [live, setLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { posts, postCount } = usePosts();

  const PostCards = posts.map((item, index) => ({
    PostImage: { uri: item?.PostImage },
    item: item,
  }));

  const auth = getAuth();

  const { user, anonymousUser, fetchUserDetails, setUser } = useAuth();
  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // UPDATED FOLLOWERS AND FOLLOW LIST IN REAL TIME
  useEffect(() => {
    const userDocRef = doc(db, "allUsers", auth.currentUser?.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUser(doc.data());
      }
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, [user?.uid]);
  // Fetch user from Context

  const isBusiness = true;
  return (
    <SafeAreaView className="h-full">
      <FAB navigation={navigation} />

      <View className="h-80 bg-[#FF26B9] rounded-b-[30px]">
        <View className="flex-row justify-between w-full items-center p-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <View className="flex-row items-center space-x-3">
            <Pressable onPress={() => navigation.navigate("ProfileEdit")}>
              <Edit size="32" color="#f9f9f9" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Setting")}>
              <Setting2 size="32" color="#f9f9f9" />
            </Pressable>
          </View>
        </View>

        <View className="space-y-2 justify-center items-center translate-y-5">
          {user?.profileImage ? (
            <Image
              source={{ uri: user?.profileImage }}
              className="w-32 h-32 rounded-3xl"
            />
          ) : (
            <Image
              source={require("../assets/Images/User/Dummy-Profile.png")}
              className="w-32 h-32 rounded-3xl"
            />
          )}

          {/* {console.log(user.profileImage)} */}
          <View className="flex-row space-x-0.5">
            <Text
              className="text-[#f9f9f9] text-xl"
              style={GlobalStyles.fontSemiBold}
            >
              {/* {user
              ? user?.userName || "Loading..."
              : anonymousUser?.userName || "Loading..."} */}
              {user?.userName || anonymousUser?.userName || "Loading..."}
            </Text>
            {isBusiness ? (
              <View className="bg-black w-5 h-5 rounded-full flex-row items-center justify-center">
                <Text
                  className="text-white text-[10px]"
                  style={GlobalStyles.fontSemiBold}
                >
                  ✓
                </Text>
              </View>
            ) : (
              ""
            )}
          </View>
        </View>

        <View className="flex-row bg-[#000000] rounded-full w-80 items-center p-5 justify-around absolute -bottom-10 self-center">
          <View className="flex-col items-center justify-center">
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {postCount}
            </Text>
            <Text
              className="text-sm text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              Posts
            </Text>
          </View>

          <View className="flex-col items-center justify-center">
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {user?.followers.length || 0}
            </Text>
            <Text
              className="text-sm text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              Followers
            </Text>
          </View>

          <View className="flex-col items-center justify-center">
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {user?.following.length || 0}
            </Text>
            <Text
              className="text-sm text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              Following
            </Text>
          </View>
        </View>
      </View>

      <View className="px-5 mt-10 mb-3">
        <TabBar setPosts={setPosts} setLive={setLive} setSaved={setSaved} />
      </View>

      <ScrollView
        className="px-5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="pb-96">
          {post && (
            <>
              {loading && (
                <ActivityIndicator
                  size="32"
                  color="#E9FA00"
                  className="mx-auto my-5"
                />
              )}
              <View className="flex-row justify-center items-center flex-wrap gap-5 my-4 pb-10">
                {PostCards.map((card, index) => (
                  <Pressable
                    key={index}
                    className=" w-24 h-24 rounded-xl overflow-hidden"
                    onPress={() =>
                      navigation.navigate("GlobalPosts", { item: card?.item })
                    }
                  >
                    <ImageBackground
                      key={index}
                      source={card?.PostImage}
                      className=" w-24 h-24 rounded-xl overflow-hidden"
                    ></ImageBackground>
                  </Pressable>
                ))}
              </View>
            </>
          )}
          {saved && (
            <>
              <View className="my-5">
                <Text className="text-white" style={GlobalStyles.fontMedium}>
                  Stay Tuned! Coming Soon...
                </Text>
              </View>
            </>
          )}
          {live && (
            <>
              <Text className="text-white" style={GlobalStyles.fontMedium}>
                Stay Tuned! Coming Soon...
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const FAB = ({ navigation }) => {
  return (
    <Pressable
      className="flex-row items-center justify-center bg-[#FF26B9] active:bg-[#bb3691] rounded-full w-20 h-20 absolute right-10 bottom-10 z-50"
      onPress={() => navigation.navigate("CreatePost")}
    >
      <Add color="#fff" variant="Outline" size="44" />
    </Pressable>
  );
};
