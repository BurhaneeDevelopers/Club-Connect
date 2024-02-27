import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../Styles/GlobalStyles";
import {
  ArrowLeft,
  Heart,
  MessageAdd1,
  Messages,
  Send2,
  Share,
} from "iconsax-react-native";

const GlobalPostDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row w-full justify-between items-center p-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
            style={GlobalStyles.fontSemiBold}
            numberOfLines={1}
          >
            Post
          </Text>

          {/* Button to Save Cafe */}
          {/* <Pressable
            className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
            onPress={() => navigation.navigate("MessageList")}
          >
            <Messages size="24" color={"#000000"} variant={"Outline"} />
          </Pressable> */}
        </View>

        <View className="p-5">
          <View className="bg-[#FF26B9] flex-row justify-between items-center p-2 py-3 rounded-2xl">
            <View className="flex-row space-x-2 justify-center items-center">
              <Image
                source={require("../../assets/Illustrations/Avatar.jpg")}
                className="w-12 h-12 rounded-full"
              />

              <Text
                className="text-white text-base"
                style={GlobalStyles.fontSemiBold}
              >
                @MohammedJhansi
              </Text>
            </View>
          </View>

          <ImageBackground
            source={require("../../assets/Images/Santorini.jpg")}
            className="h-96 w-full mt-3 rounded-3xl overflow-hidden"
          ></ImageBackground>
          <View className="mt-3 flex-row justify-between items-center">
            <View className="flex-row justify-around p-3 px-4 bg-[#FF26B9] space-x-3 rounded-2xl">
              <Heart size={"24"} color="#f9f9f9" variant="Outline" />
              <MessageAdd1 size={"24"} color="#f9f9f9" variant="Outline" />
              <Send2 size={"24"} color="#f9f9f9" variant="Outline" />
            </View>

            <Pressable className="flex-row justify-around p-2 bg-[#E9FA00] rounded-xl">
              <Messages size={"24"} color="#000000" variant="Outline" />
            </Pressable>
          </View>

          <Text className="text-white my-3" numberOfLines={4}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            esse explicabo quisquam consequuntur et culpa laudantium ea sit
            doloribus dignissimos iure laborum repudiandae tempora dolor enim,
            porro, rerum modi assumenda suscipit? Eum, laudantium deserunt!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit iusto
            impedit a eveniet saepe provident voluptatum tempora autem ad
            aliquid?
          </Text>

          <View>
            <Text className="text-base text-white">Tags: </Text>

            <View className="flex-row flex-wrap items-center mt-2">
              <Tag title={"BigNews"} />
              <Tag title={"VeryBigNews"} />
              <Tag title={"VHSLIFEISAWESOME"} />
              <Tag title={"VIBEHOTSPOTDEVSROCKS"} />
              <Tag title={"BigNews"} />
              <Tag title={"BigNews"} />
              <Tag title={"BigNews"} />
              <Tag title={"BigNews"} />
              <Tag title={"BigNews"} />
              <Tag title={"BigNews"} />
              <Tag title={"BigNews"} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GlobalPostDetailsScreen;

const Tag = ({ title }) => {
  return (
    <View className="bg-[#E9FA00] p-1.5 px-2 rounded-lg mr-2 my-1">
      <Text className="">#{title}</Text>
    </View>
  );
};
