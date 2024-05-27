import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Location,
  Heart,
  Calendar,
  People,
  Car,
  Building3,
  Map,
  TickSquare,
  TicketStar,
} from "iconsax-react-native";
import { useState, useEffect } from "react";
import GlobalStyles from "../../Styles/GlobalStyles";
import { useRoute } from "@react-navigation/native";
import GlobalDetailsSlider from "../../Components/GlobalDetailsSlider";

const GlobalDetailsScreen = ({ navigation }) => {
  const {
    params: {
      id,
      image,
      rating,
      title,
      location,
      shortDescription,
      openingTime,
    },
  } = useRoute();

  const [visible, setVisible] = React.useState(false);

  const [selectedIcon, setSelectedIndex] = useState(null); // Track the currently selected icon

  const handleIconPress = (iconName) => {
    setSelectedIndex(iconName); // Update the selected icon state
  };

  return (
    <View className="">
      <GlobalDetailsSlider />

      <View className="h-16 w-80 mx-auto -mt-10 rounded-full flex-row px-5 items-center justify-between bg-[#FF26B9]">
        <View className="flex-row my-auto items-center">
          <Image
            source={require("../../assets/Illustrations/Avatar.jpg")}
            className="w-12 h-12 rounded-full"
          />
          <Image
            source={require("../../assets/Illustrations/Avatar.jpg")}
            className="w-12 h-12 rounded-full -mx-5"
          />
          <Image
            source={require("../../assets/Illustrations/Avatar.jpg")}
            className="w-12 h-12 rounded-full"
          />

          <Text className="ml-1 text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
            +24 Likes this
          </Text>
        </View>

        <View className="bg-[#E9FA00] px-3 py-2 rounded-lg">
          <Text style={GlobalStyles.fontSemiBold}>Review</Text>
        </View>
      </View>

      <ScrollView className="">
        <View className="p-5 px-3 pb-96">
          <Text
            className="text-3xl text-white mb-3"
            style={GlobalStyles.fontBold}
          >
            {title}
          </Text>

          <View className="flex-row space-x-1 items-center">
            {/* Location Name */}

            <Location size={"24"} color="#E9FA00" />
            <Text
              className="text-[#f9f9f9] max-w-[320px] text-sm"
              style={GlobalStyles.fontRegular}
            >
              {location}
            </Text>
          </View>

          <View className="p-5 space-y-5">
            <View className="flex-row space-x-2 items-center">
              {/* Choose Date & Time */}
              <View className="bg-[#262626] p-3 rounded-xl">
                <Calendar size={"24"} color="#E9FA00" variant="Bulk" />
              </View>

              <View className="">
                <Text
                  className="text-base text-[#f9f9f9]"
                  style={GlobalStyles.fontMedium}
                >
                  Choose Date & Time
                </Text>

                <Text
                  className="text-[#FF26B9] text-xs"
                  style={GlobalStyles.fontMedium}
                >
                  Tuesday, 8:00Pm - 9:00Pm
                </Text>
              </View>
            </View>

            {/* Choose Members  */}
            <View className="flex-row space-x-2 items-center">
              <View className="bg-[#262626] p-3 rounded-xl">
                <People size={"24"} color="#E9FA00" variant="Bulk" />
              </View>

              <View>
                <Text
                  className="text-base text-[#f9f9f9]"
                  style={GlobalStyles.fontRegular}
                >
                  Choose Members
                </Text>

                <Text
                  className="text-[#FF26B9] text-xs"
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
                source={{ uri: image }}
                className="w-20 h-20 rounded-xl"
                resizeMode="cover"
              />

              <View className="w-44">
                <Text
                  className="text-white text-base"
                  style={GlobalStyles.fontSemiBold}
                >
                  {openingTime}
                </Text>
                <Text
                  className="text-[#E9FA00] text-sm"
                  style={GlobalStyles.fontRegular}
                >
                  Opening hours
                </Text>
              </View>
            </View>

            <View className="bg-[#E9FA00] px-3 py-2 rounded-lg">
              <Text style={GlobalStyles.fontSemiBold}>Share</Text>
            </View>
          </View>

          {/* Description  */}
          <Text
            className="text-white text-sm"
            numberOfLines={4}
            style={GlobalStyles.fontMedium}
          >
            {shortDescription}
          </Text>

          {/* Features of the Cafe  */}
          <ScrollView
            horizontal={true}
            className="my-5"
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row pl-2">
              <FeatureCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Food Menu"
              />
              <FeatureCards
                icon={<Car size="32" color="#f9f9f9" variant="Broken" />}
                title="Drinks"
              />
              <FeatureCards
                icon={<Building3 size="32" color="#f9f9f9" variant="Broken" />}
                title="Gallery"
              />
              <FeatureCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Poll"
              />
            </View>
          </ScrollView>

          <View className="py-5 space-y-5">
            <View className="p-3 bg-[#E9FA00] rounded-xl w-full flex-row space-x-2 items-end justify-center">
              <Text
                className="text-center text-base text-[#000000]"
                style={GlobalStyles.fontBold}
              >
                Take me there...
              </Text>

              <Map size="24" color="#000000" variant="Bold" />
            </View>
            <Pressable
              className="p-3 bg-[#FF26B9] active:bg-[#c52d95] rounded-xl flex-row space-x-2 items-end justify-center"
              onPress={() => setVisible(true)}
            >
              <Text
                className="text-center text-base text-white"
                style={GlobalStyles.fontBold}
              >
                Book Now
              </Text>

              <TicketStar size="24" color="#f9f9f9" variant="Bold" />
            </Pressable>

            {/* <Portal>
              <Dialog
                visible={visible}
                onDismiss={() => setVisible(false)}
                className="bg-[#262626]"
              >
                <Dialog.Title className="text-3xl text-white">
                  Feedback
                </Dialog.Title>
                <Dialog.Content>
                  <Text className="text-base text-white">
                    Please Provide your valuable Feedback
                  </Text>

                  <View className="mt-4 flex-row space-x-4">
                    <TouchableOpacity
                      onPress={() => handleIconPress("thumbsUp")}
                      disabled={selectedIcon === "thumbsUp"}
                    >
                      {selectedIcon === "thumbsUp" ? (
                        <ThumbsUpSelected
                          width="40"
                          height="40"
                          selected={selectedIcon === "thumbsUp"}
                        />
                      ) : (
                        <ThumbsUp
                          width="40"
                          height="40"
                          selected={selectedIcon === "thumbsUp"}
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleIconPress("thumbsDown")}
                      disabled={selectedIcon === "thumbsDown"}
                    >
                      {selectedIcon === "thumbsDown" ? (
                        <ThumbsDownSelected
                          width="40"
                          height="40"
                          selected={selectedIcon === "thumbsDown"}
                        />
                      ) : (
                        <ThumbsDown
                          width="40"
                          height="40"
                          selected={selectedIcon === "thumbsDown"}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Pressable
                    className="px-4 py-2 bg-[#FF26B9] active:bg-[#c52d95] rounded-xl justify-center"
                    onPress={() => setVisible(false)}
                  >
                    <Text
                      className="text-center text-xl text-white"
                      style={GlobalStyles.fontBold}
                    >
                      Submit
                    </Text>
                  </Pressable>
                </Dialog.Actions>
              </Dialog>
            </Portal> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GlobalDetailsScreen;

const FeatureCards = ({ icon, title, navigateTo, navigation }) => {
  return (
    <>
      <Pressable
        className="bg-[#FF26B9] active:bg-[#c52d95] rounded-lg p-2.5 px-5 justify-center items-center flex-col mx-2"
        onPress={() => navigation.navigate(navigateTo)}
      >
        {/* {icon} */}
        <Text
          style={GlobalStyles.fontSemiBold}
          className="text-[#f9f9f9] text-sm"
        >
          {title}
        </Text>
      </Pressable>
    </>
  );
};
