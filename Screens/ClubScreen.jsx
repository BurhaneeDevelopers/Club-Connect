import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "iconsax-react-native";




const ClubScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="h-full w-full">
          {/* MENU  */}
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
              Clubs
            </Text>

            {/* Button to Save Cafe */}
            {/* <Pressable
            
              className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
              onPress={toggleSave}
            >
              <SearchNormal
                size="24"
                color={isLiked ? "#FF26B9" : "#101010"}
                variant={isLiked ? "Bold" : "Outline"}
              />
            </Pressable> */}
            <Pressable
              className="border-2 border-[#FF26B9] rounded-full absolute top-3 right-5"
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={require("../assets/Images/User/Dummy-Profile.png")}
                className="w-10 h-10 rounded-full"
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClubScreen;
