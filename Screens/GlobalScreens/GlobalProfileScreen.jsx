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
import { ArrowLeft, Setting2, Messages1 } from "iconsax-react-native";
import GlobalStyles from "../../Styles/GlobalStyles";
import TabBar from "../../Components/TabBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import FollowButton from "../../Components/FollowButton";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { db } from "../../firebase";

const GlobalProfileScreen = ({ navigation }) => {
  const [post, setPosts] = useState(true);
  const [saved, setSaved] = useState(false);
  const [live, setLive] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [postItem, setPostItem] = useState([]);
  const [postCount, setPostCount] = useState(0);

  UNSPLASH_ACCESS_KEY = "6KEJery9EMaZFtuiQjELpzqV5sgo9vVWqm52b_gKYZ4";

  const fetchPostItem = async (count) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: "resorts", // You can modify the query to match your requirements
            per_page: count, // Specify the number of posts to fetch
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      const images = response.data.results.map((result) => result.urls.regular);
      setPostItem(images);
      setPostCount(count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  useEffect(() => {
    // Specify the number of posts to fetch (you can use a random number here)
    const randomPostCount = Math.floor(Math.random() * 20) + 1; // Change 10 to your desired max post count
    fetchPostItem(randomPostCount);
  }, []);

  const PostCards = postItem.map((image, index) => ({
    img: { uri: image },
    title: `Hotspot ${index + 1}`,
    location: "Unknown",
    price: "100",
    rating: "4.5",
  }));

  // useEffect(() => {
  //   fetchUserDetails();
  // }, [user, user?.profileImage]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // This is the currentUser
  const {
    params: { user },
  } = useRoute();

  // UPDATED FOLLOWERS AND FOLLOW LIST IN REAL TIME
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const userDocRef = doc(db, "allUsers", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserDetails(doc.data());
      }
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, [user.uid]);

  return (
    <SafeAreaView>
      <View className="h-80 bg-[#FF26B9] rounded-b-[30px]">
        <View className="flex-row justify-between w-full items-center p-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <View className="flex-row items-center space-x-3">
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
              source={require("../../assets/Illustrations/Avatar.jpg")}
              className="w-32 h-32 rounded-xl"
            />
          )}

          {/* {console.log(user.profileImage)} */}

          <Text
            className="text-[#f9f9f9] text-xl"
            style={GlobalStyles.fontSemiBold}
          >
            {/* {user
              ? user?.userName || "Loading..."
              : anonymousUser?.userName || "Loading..."} */}
            {user?.userName || anonymousUser?.userName || "Loading..."}
          </Text>
        </View>

        <View className="flex-row bg-[#000000] rounded-full w-80 items-center p-5 justify-around absolute -bottom-10 self-center">
          <View className="flex-col items-center justify-center">
            <Text
              className="text-xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {postCount}
            </Text>
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              Posts
            </Text>
          </View>

          <Pressable
            className="flex-col items-center justify-center"
            onPress={() =>
              navigation.navigate("FollowersList", { userId: userDetails?.uid })
            }
          >
            <Text
              className="text-xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {userDetails.followers ? userDetails.followers.length : 0}
            </Text>
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              Followers
            </Text>
          </Pressable>

          <Pressable
            className="flex-col items-center justify-center"
            onPress={() =>
              navigation.navigate("FollowingList", { userId: userDetails?.uid })
            }
          >
            <Text
              className="text-xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {userDetails.following ? userDetails.following.length : 0}
            </Text>
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              Following
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-col w-80 mt-10 mx-auto">
        <View className=" bg-[#262626] flex-row rounded-3xl justify-around items-center px-3 py-4 ">
          <FollowButton
            otherUserId={user.uid}
            customClass="px-20 py-2.5 rounded-2xl"
          />
          <Pressable
            className="px-2.5 py-2.5 border-[#E9FA00] border rounded-2xl"
            onPress={() => navigation.navigate("Chat", { user })}
          >
            <Messages1 className="text-[#E9FA00]" />
          </Pressable>
        </View>
      </View>

      <View className="px-5 mt-5 mb-3">
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
                    onPress={() => navigation.navigate("GlobalPosts")}
                  >
                    <ImageBackground
                      key={index}
                      source={card.img}
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
                {/* <SavedCards />
                <SavedCards />
                <SavedCards />
                <SavedCards /> */}
              </View>
            </>
          )}
          {live && (
            <>
              <Text className="text-white">Live Here</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GlobalProfileScreen;

const FeatureCards = ({ navigateTo, navigation }) => {
  return (
    <>
      <Pressable
        className="bg-[#FF26B9] active:bg-[#c52d95] rounded-lg p-2.5 px-5 justify-center items-center flex-col mx-2"
        onPress={() => navigation.navigate(navigateTo)}
      >
        {/* {icon} */}
        <Text style={GlobalStyles.fontSemiBold} className="text-[#000000]">
          Title
        </Text>
      </Pressable>
    </>
  );
};

const PrivateCard = () => {
  return (
    <View className="px-5 mt-7">
      <View className="bg-[#1c1c1c] mt-20 h-96 rounded-[30px] items-center justify-center space-y-7">
        <View>
          <Lock size="100" color="#FF26B9" />
        </View>
        <View className="flex-col justify-center items-center">
          <Text
            className="text-[#d9d9d9] text-2xl"
            style={GlobalStyles.fontSemiBold}
          >
            This is a Private Account
          </Text>
          <Text
            className="text-[#d9d9d9] text-md"
            style={GlobalStyles.fontSemiBold}
          >
            Follow them to see their posts.
          </Text>
        </View>
      </View>
    </View>
  );
};
