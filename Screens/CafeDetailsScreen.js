import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Clock,
  SearchNormal1,
  Add,
  Star1,
  Location,
  Heart,
  Bookmark,
  Calendar,
  People,
} from "iconsax-react-native";
import { useState, useEffect } from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import axios from "axios";

const CafeDetailsScreen = ({navigation}) => {
 
  return (
    <View className="">
      <ImageBackground
        source={require("../assets/Images/Santorini.jpg")}
        className="w-full h-80 rounded-b-[30px] overflow-hidden"
      >
        <View className="flex-row w-full  justify-between items-center p-5 bg-black/40">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-3xl text-[#E9FA00] mx-auto"
            style={GlobalStyles.fontSemiBold}
          >
            Cafe Details
          </Text>

          {/* Button to Save Cafe */}
          <Pressable className="bg-[#E9FA00] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5">
            <Heart size="24" color="#101010" />
          </Pressable>
        </View>
      </ImageBackground>

      <View className="h-16 w-80 mx-auto -mt-10 rounded-full flex-row px-5 items-center justify-between bg-[#FF26B9]">
        <View className="flex-row my-auto">
          <Image
            source={require("../assets/Illustrations/Avatar.jpg")}
            className="w-12 h-12 rounded-full"
          />
          <Image
            source={require("../assets/Illustrations/Avatar.jpg")}
            className="w-12 h-12 rounded-full -mx-5"
          />
          <Image
            source={require("../assets/Illustrations/Avatar.jpg")}
            className="w-12 h-12 rounded-full"
          />
        </View>

        <View className="bg-[#E9FA00] px-3 py-2 rounded-lg">
          <Text style={GlobalStyles.fontMedium}>Review</Text>
        </View>
      </View>

      <ScrollView className="">
        <View className="p-5 pb-96">
          <Text
            className="text-5xl text-white"
            style={GlobalStyles.fontSemiBold}
          >
            SS Hyderabadi Biriyani
          </Text>

          <View className="flex-row space-x-2 items-center">
            {/* Location Name */}

            <Location size={"20"} color="#E9FA00" />
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontRegular}
            >
              Tondiarpet Chennai 600001
            </Text>
          </View>

          <View className="p-5 space-y-5">
            <View className="flex-row space-x-2 items-center">
              {/* Choose Date & Time */}
              <View className="bg-[#262626] p-3 rounded-xl">
                <Calendar size={"28"} color="#E9FA00" variant="Bulk" />
              </View>

              <View className="">
                <Text
                  className="text-lg text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  Choose Date & Time
                </Text>

                <Text
                  className="text-[#FF26B9]"
                  style={GlobalStyles.fontRegular}
                >
                  Tuesday, 8:00Pm - 9:00Pm
                </Text>
              </View>
            </View>

            {/* Choose Members  */}
            <View className="flex-row space-x-2 items-center">
              <View className="bg-[#262626] p-3 rounded-xl">
                <People size={"28"} color="#E9FA00" variant="Bulk" />
              </View>

              <View>
                <Text
                  className="text-lg text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  Choose Members
                </Text>

                <Text
                  className="text-[#FF26B9]"
                  style={GlobalStyles.fontRegular}
                >
                  6 Adults, 3 Kids
                </Text>
              </View>
            </View>
          </View>

          <View className="my-5 flex-row justify-between items-center">
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("../assets/Illustrations/Avatar.jpg")}
                className="w-20 h-20 rounded-xl"
              />

              <View className="w-44">
                <Text
                  className="text-white text-2xl"
                  style={GlobalStyles.fontSemiBold}
                >
                  Shivaji Thalapathi
                </Text>
                <Text
                  className="text-[#E9FA00] text-lg"
                  style={GlobalStyles.fontRegular}
                >
                  Owner
                </Text>
              </View>
            </View>

            <View className="bg-[#E9FA00] px-3 py-2 rounded-lg">
              <Text style={GlobalStyles.fontMedium}>Follow</Text>
            </View>
          </View>

          {/* Description  */}
          <Text
            className="text-white text-base"
            numberOfLines={4}
            style={GlobalStyles.fontMedium}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            excepturi non fuga hic! Beatae exercitationem nulla facilis,
            quisquam est distinctio laborum, officia, inventore unde cumque
            soluta vitae optio atque dolore! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium molestias vel quam magnam
            quaerat, non quisquam cumque provident asperiores inventore deserunt
            laborum sed sapiente tempora rem nobis quasi tempore autem
            cupiditate! Sit ad amet quibusdam harum, accusantium nihil, iste
            voluptatem impedit voluptatibus aliquam, nemo excepturi animi!
            Quisquam commodi aut, neque rerum, fuga doloremque quae doloribus
            iure autem praesentium dolorem natus enim nostrum quibusdam placeat
            ab in earum quia quidem exercitationem. A nemo quam, voluptatibus
            veniam velit nesciunt commodi non doloribus architecto unde
            voluptate et officiis facere provident, suscipit distinctio
            perspiciatis saepe iure ad totam inventore. Ut dolores saepe
            voluptate in perferendis, cum exercitationem at reiciendis ipsam
            dolorum facilis eaque corrupti praesentium! Illo officia et sequi
            amet magnam reprehenderit repudiandae, earum non numquam dicta
            nesciunt, dignissimos ad asperiores libero ea fuga. Nisi ab ducimus
            labore vel saepe numquam iure quaerat ex, doloremque aperiam
            asperiores at illo, ad vitae voluptates itaque dolorem magni velit
            dolores. Perferendis iure omnis earum? Officiis ullam eius deleniti
            voluptatum laboriosam. Quibusdam expedita, dolor animi laboriosam
            omnis consectetur voluptatem ut voluptates, deserunt et soluta quasi
            deleniti modi unde dignissimos, asperiores amet. Minus illum ipsam
            dolorem numquam nihil ex?
          </Text>

          {/* Features of the Cafe  */}
          <ScrollView
            horizontal={true}
            className="my-5"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row pl-5">
              <FeatureCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Map"
              />
              <FeatureCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Map"
              />
              <FeatureCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Map"
              />
              <FeatureCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Map"
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default CafeDetailsScreen;

const FeatureCards = ({ icon, title, navigateTo, navigation }) => {
  return (
    <>
      <Pressable
        className="bg-[#FF26B9] active:bg-[#c52d95] rounded-3xl w-24 h-24 justify-center items-center flex-col mx-2"
        onPress={() => navigation.navigate(navigateTo)}
      >
        {icon}
        <Text style={GlobalStyles.fontSemiBold} className="text-[#101010]">
          {title}
        </Text>
      </Pressable>
    </>
  );
};
