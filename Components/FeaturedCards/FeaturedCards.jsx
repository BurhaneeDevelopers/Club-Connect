import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { Car, Heart, Location, Star1, Timer1 } from "iconsax-react-native";
import useLocation from "../../Hooks/useLocation";
import { urlFor } from "../../sanity";

const PopularCafeCards = ({
  id,
  image,
  rating,
  title,
  location,
  shortDescription,
  openingTime,
  ownerProfileImage,
  dataType,
  navigation,
  lat,
  long,
  calculateDistance,
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;

  const [isLiked, setIsLiked] = useState(false);
  const toggleSave = () => {
    setIsLiked(!isLiked);
  };

  const { latitude, longitude } = useLocation();

  // console.log(latitude, longitude);
  const distance =
    latitude && longitude && lat && long
      ? calculateDistance(latitude, longitude, lat, long)
      : NaN;
  return (
    <>
      <View
        className="w-80 rounded-[30px]  overflow-hidden mx-2 bg-[#1c1b1b] 
            pb-3"
      >
        <ImageBackground
          source={{ uri: urlifiedImage }}
          defaultSource={require("../../assets/Images/User/Dummy-Profile.png")}
          className="w-full h-36"
        >
          {/* Button to Save Card */}
          <Pressable
            className="bg-black/40 active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
            onPress={toggleSave}
          >
            <Heart
              size="24"
              color={isLiked ? "#FF26B9" : "#f9f9f9"}
              variant={isLiked ? "Bold" : "Outline"}
            />
          </Pressable>

          <View className="bg-black/40 flex-row justify-center items-center py-1 px-2 absolute top-3 rounded-lg left-5 space-x-1">
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              {rating}
            </Text>

            <Star1 size="14" color="#fff" variant="Bold" />
          </View>

          <View className="bg-[#000000]/50 w-full h-14 absolute bottom-0 justify-center items-center">
            <View className="w-full px-5">
              <View className="flex-row items-center space-x-2">
                <Timer1 size="24" color="#fff" variant="Bold" />

                <Text
                  className="text-lg text-[#f9f9f9]"
                  style={GlobalStyles.fontMedium}
                >
                  {openingTime}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* <View className="absolute bg-[#000000]/30 w-full h-full" /> */}
        <View className="flex-col p-4 w-full z-10">
          <View className="flex-row justify-between items-center">
            {/* Location Name */}
            <Text
              className="text-2xl text-[#f9f9f9] max-w-[280px]"
              style={GlobalStyles.fontBold}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          {/* Time  */}
          {
            (latitude,
            longitude ? (
              <View className="flex-row items-center mt-2 space-x-1">
                <Car size={"18"} color="#FF26B9" variant="Bold" />
                <Text
                  className="text-white text-base"
                  style={GlobalStyles.fontRegular}
                >
                  {distance.toFixed(2)}Km from you
                </Text>
              </View>
            ) : (
              ""
            ))
          }

          {/* Location  */}
          <View className="flex-row items-center mt-1 space-x-1">
            <Location size="18" color="#FF26B9" variant="Bold" />
            <Text
              className="text-base text-[#f9f9f9] max-w-[280px]"
              style={GlobalStyles.fontRegular}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>

          {/* Button  */}
          <Pressable
            className="p-2 mt-4 border border-[#E9FA00] active:bg-[#000000] rounded"
            onPress={() =>
              navigation.navigate("GlobalDetails", {
                id,
                image,
                rating,
                title,
                location,
                shortDescription,
                openingTime,
                ownerProfileImage,
                dataType,
                navigation,
              })
            }
          >
            <Text className="text-[#f9f9f9] text-center">View Details</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const ExploreCard = ({
  id,
  image,
  rating,
  title,
  location,
  shortDescription,
  openingTime,
  ownerProfileImage,
  dataType,
  navigation,
  lat,
  long,
  calculateDistance,
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;

  const { latitude, longitude } = useLocation();

  // console.log(latitude, longitude);
  const distance =
    latitude && longitude && lat && long
      ? calculateDistance(latitude, longitude, lat, long)
      : NaN;
  return (
    <View className="bg-[#262626] rounded-2xl w-64 h-24 p-3 flex-row space-x-4 mx-2 overflow-hidden">
      <View
        className="overflow-hidden rounded-xl"
        // style={{
        //   shadowColor: "#000",
        //   shadowOffset: {
        //     width: 0,
        //     height: 8,
        //   },
        //   shadowOpacity: 0.21,
        //   shadowRadius: 8.19,
        //   elevation: 32,
        //   // backgroundColor: "#0000",
        // }}
      >
        <Image
          source={{ uri: urlifiedImage }}
          defaultSource={require("../../assets/Images/User/Dummy-Profile.png")}
          className="w-20 h-20"
        />
      </View>

      <View className="">
        <Text
          className="text-[#f9f9f9] w-32 text-base"
          numberOfLines={1}
          style={GlobalStyles.fontSemiBold}
        >
          {title}
        </Text>

        {/* Rating  */}
        <View className="flex-row items-center space-x-2 my-2">
          <View className="flex-row items-center space-x-1">
            <Star1 size="18" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              {rating}
            </Text>
          </View>

          {
            (latitude,
            longitude ? (
              <>
                <Text className="text-gray-400 text-center">•</Text>

                <View className="flex-row items-center">
                  <Car size="16" color="#FF26B9" variant="Bold" />
                  <Text
                    className="text-[#f9f9f9]"
                    style={GlobalStyles.fontMedium}
                  >
                    {distance.toFixed(2)}Km
                  </Text>
                </View>
              </>
            ) : (
              ""
            ))
          }
        </View>
        <Pressable
          className="py-1 border border-[#E9FA00] active:bg-[#000000] rounded-lg"
          onPress={() =>
            navigation.navigate("GlobalDetails", {
              id,
              image,
              rating,
              title,
              location,
              shortDescription,
              openingTime,
              ownerProfileImage,
              dataType,
            })
          }
        >
          <Text className="text-[#f9f9f9] text-center">View Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const TopPickCard = ({
  id,
  image,
  rating,
  title,
  location,
  shortDescription,
  openingTime,
  ownerProfileImage,
  dataType,
  navigation,
  lat,
  long,
  calculateDistance,
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;

  const { latitude, longitude } = useLocation();

  // console.log(latitude, longitude);
  const distance =
    latitude && longitude && lat && long
      ? calculateDistance(latitude, longitude, lat, long)
      : NaN;
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("GlobalDetails", {
          id,
          image,
          rating,
          title,
          location,
          shortDescription,
          openingTime,
          ownerProfileImage,
          dataType,
        })
      }
    >
      <ImageBackground
        source={{ uri: urlifiedImage }}
        defaultSource={require("../../assets/Images/User/Dummy-Profile.png")}
        className="w-40 h-64 rounded-[30px] overflow-hidden mx-2"
      >
        <View className="absolute bg-[#000000]/30 w-full h-full" />
        <View className="flex-col absolute bottom-0 px-4 w-full space-y-1 z-10 bg-black/40 pb-3 pt-2">
          {/* Location Name */}
          <Text
            className="text-xl text-[#f9f9f9]"
            style={GlobalStyles.fontBold}
            numberOfLines={1}
          >
            {title}
          </Text>
          {/* Location  */}
          <View className="flex-row items-center space-x-1">
            <Location size="18" color="#f9f9f9" variant="Bold" />
            <Text
              className="text-base text-[#f9f9f9]"
              style={GlobalStyles.fontRegular}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            {/* Price  */}

            {
              (latitude,
              longitude ? (
                <View className="flex-row items-center">
                  <Car size="18" color="#f9f9f9" variant="Bold" />
                  <Text
                    className="text-[#f9f9f9]"
                    style={GlobalStyles.fontRegular}
                  >
                    {distance.toFixed(2)}Km
                  </Text>
                </View>
              ) : (
                ""
              ))
            }
            {/* Rating  */}
            <View className="flex-row items-center space-x-1">
              <Star1 size="18" color="#f9f9f9" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                {rating}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export { PopularCafeCards, ExploreCard, TopPickCard };
