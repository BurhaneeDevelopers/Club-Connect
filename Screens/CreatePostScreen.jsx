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
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CreatePostInput from "../Components/CreatePostInput";
import usePosts from "../Hooks/posts/usePosts";

const CreatePostScreen = ({ navigation }) => {
  // FETCH EDITED PROFILE DATA
  const [postImage, setPostImage] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [postDescription, setPostDescription] = useState(null);
  const [postTags, setPostTags] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagsError, setTagsError] = useState(false);

  const { handleCreatePost, pickImage, image } = usePosts();
  // To open BottomSheet
  // const refRBSheet = useRef();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
        className="h-screen w-screen items-center justify-center mx-auto px-1"
      >
        {/* {!animationPlayed && (
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
        )} */}

        {/* <RBSheet
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
        </RBSheet> */}

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
              Create Posts
            </Text>
          </View>

          <CreatePostInput
            states={{
              postTitle: postTitle,
              setPostTitle: setPostTitle,

              postDescription: postDescription,
              setPostDescription: setPostDescription,

              postTags: postTags,
              setPostTags: setPostTags,

              postImage: postImage,
              setPostImage: setPostImage,

              tagsError: tagsError,
              setTagsError: setTagsError,
            }}
          />

          <View className="space-y-2 justify-center items-center my-3 p-5">
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-full h-72 rounded-xl object-contain"
              />
            ) : (
              <Pressable
                className="w-full h-44 rounded-xl bg-[#101010] flex-row justify-center items-center"
                style={{
                  borderStyle: "dashed",
                  borderRadius: 1,
                  borderWidth: 2,
                  borderColor: "#FF26B8",
                }}
                onPress={pickImage}
              >
                <Text
                  className="text-white text-lg"
                  style={GlobalStyles.fontMedium}
                >
                  Upload Image
                </Text>
              </Pressable>
            )}
          </View>

          {success && (
            <Text
              className="text-[#E9FA00] px-5 mt-2"
              style={GlobalStyles.fontMedium}
            >
              Hoorraayy!! Post Created Successfully!
            </Text>
          )}

          {loading && (
            <>
              <ActivityIndicator color="#E9FA00" size={24} />
            </>
          )}

          <View className="py-4 flex-row justify-center items-center space-x-5">
            <Pressable
              className={`w-40 bg-[#FF26B9] active:bg-[#FF26B9]/70 py-2 rounded-xl items-center ${
                loading || tagsError ? "opacity-50" : ""
              }`}
              onPress={() => {
                handleCreatePost(
                  setSuccess,
                  setLoading,
                  postTitle,
                  postDescription,
                  postTags,
                  navigation
                );
              }}
              disabled={loading || tagsError}
            >
              <Text
                className="text-[#f9f9f9] text-lg font-semibold"
                style={GlobalStyles.fontMedium}
              >
                Create Post
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
