import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";
import { collection, query, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import usePosts from "../../Hooks/posts/usePosts";
import Skeleton from "../../Components/Skeleton";
import SectionTitles from "../../Components/SectionTitles";
import { ArrowLeft } from "iconsax-react-native";

const GlobalAllPostScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allUsersSnapshot = await getDocs(collection(db, "allUsers"));
        const allPosts = [];

        for (const userDoc of allUsersSnapshot.docs) {
          const userPostsSnapshot = await getDocs(
            collection(userDoc.ref, "userPosts")
          );

          userPostsSnapshot.forEach((postDoc) => {
            allPosts.push({ id: postDoc.id, ...postDoc.data() });
          });
        }

        setPosts(allPosts);
        console.log("Post", posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <SafeAreaView className="">
      {/* <FlatList
        data={posts}
        renderItem={({ item }) => {
          <Pressable
            className="w-24 h-24 rounded-xl"
            onPress={() => navigation.navigate("GlobalPosts", { item: item })}
          >
            <ImageBackground
              source={{ uri: item?.PostImage }}
              className="w-24 h-24 rounded-xl overflow-hidden"
            ></ImageBackground>
          </Pressable>;
        }}
        keyExtractor={(item) => item?.id}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator />}
      /> */}
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
          Explore All Posts
        </Text>
      </View>

      <View className="flex-row items-center justify-center space-x-5 p-5">
        {loading ? (
          <View className="flex-row flex-wrap justify-center items-center">
            <Skeleton
              width={380}
              height={750}
              customClass="rounded-[30px] m-2 overflow-hidden bg-[#262626]"
            />
          </View>
        ) : (
          posts.map((item) => {
            return (
              <Pressable
                className="w-28 h-28 rounded-xl"
                onPress={() =>
                  navigation.navigate("GlobalPosts", { item: item })
                }
              >
                <ImageBackground
                  source={{ uri: item?.PostImage }}
                  className="w-28 h-28 rounded-xl overflow-hidden"
                ></ImageBackground>
              </Pressable>
            );
          })
        )}
      </View>
    </SafeAreaView>
  );
};

export default GlobalAllPostScreen;
