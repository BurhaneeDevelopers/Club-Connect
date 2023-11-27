import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import SectionTitles from "./SectionTitles";
import client, { urlFor } from "../sanity";
import {
  Car,
  Clock,
  Heart,
  Location,
  Star1,
  Timer1,
  WristClock,
} from "iconsax-react-native";
import HR from "./HR";
import { useNavigation } from "@react-navigation/native";
import useSelectedCity from "../Hooks/useSelectedCity";
import useLocation from "../Hooks/useLocation";

const FeaturedHomeRow = ({ id, title, navigation, featuredId, dataType }) => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { selectedCity } = useSelectedCity();

  useEffect(() => {
    const fetchDataInFeaturedCategory = () => {
      setLoading(true);

      try {
        client
          .fetch(
            `*[_type == "featured" && _id == $id]{
               ...,
               ${dataType
                 .map(
                   (type) =>
                     `${type}[] -> { ..., dishes[]->, type-> { name } },`
                 )
                 .join("")}
            }[0]
            `,
            { id, dataType }
          )
          .then((data) => {
            const itemData = dataType.map((type) => data[type]).flat();
            setItemData(itemData);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInFeaturedCategory();
  }, []);

  const { latitude, longitude } = useLocation();

  useEffect(() => {
    // console.log("LAT", latitude);
    // console.log("LONG", longitude);
  }, [latitude, longitude]);

  const filterDataByCity = (data) => {
    // Filter data based on the selected city or live location
    return data.filter((item) => {
      const isSameCity = item && item.city === selectedCity;
      const isNearby =
        latitude &&
        longitude &&
        item &&
        calculateDistance(latitude, longitude, item.lat, item.long) <= 10; // Adjust the distance threshold as needed

      // Show the item if it's the selected city or nearby, or if neither city nor location is selected
      return (
        isSameCity || isNearby || (!selectedCity && !latitude && !longitude)
      );
    });
  };

  const calculateDistance = (userLat, userLong, itemLat, itemLong) => {
    if (
      userLat === undefined ||
      userLong === undefined ||
      itemLat === undefined ||
      itemLong === undefined
    ) {
      return NaN; // Handle the case when location data is not available
    }

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(itemLat - userLat);
    const dLon = deg2rad(itemLong - userLong);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userLat)) *
        Math.cos(deg2rad(itemLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const renderCards = (itemData, FeaturedCards) => {
    const filteredData = filterDataByCity(itemData);

    return filteredData?.map((item) => (
      <FeaturedCards
        key={item?._id}
        id={item?._id}
        image={item?.image}
        rating={item?.rating}
        title={item?.name}
        location={item?.address}
        shortDescription={item?.short_description}
        openingTime={item?.openingTime}
        ownerProfileImage={item?.ownerProfileImage}
        lat={item?.lat}
        long={item?.long}
        calculateDistance={calculateDistance}
        dataType={dataType}
        navigation={navigation}
      />
    ));
  };

  return (
    <View>
      <View className="p-5">
        {/* Featured Title like `Hot Deals Just For You!, Top Picks!` */}
        <SectionTitles title={title} />
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading && <ActivityIndicator size="32" color="#E9FA00" />}
        <View className="px-5 flex-row items-center justify-center w-full">
          {featuredId == 5 && renderCards(itemData, TopPickCard)}
          {featuredId == 1 && renderCards(itemData, NearestPickCard)}
          {featuredId == 4 && renderCards(itemData, ExploreCard)}
          {featuredId == 2 && renderCards(itemData, PopularCafeCards)}
          {featuredId == 3 && renderCards(itemData, RecommendedCard)}
        </View>
      </ScrollView>
      {/* <View className="p-5">{renderCards(itemData, IteratingCards)}</View> */}
    </View>
  );
};

export default FeaturedHomeRow;

const NearestPickCard = ({
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
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;
  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate("CafeDetails", {
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
        <View className="w-72 h-72 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <Image
            source={{ uri: urlifiedImage }}
            defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
            className="w-full h-32"
          />

          {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
          <View className="flex-col p-4 w-full space-y-1 z-10">
            <View className="flex-row justify-between items-center">
              {/* Location Name */}
              <Text
                className="text-xl text-[#f9f9f9]"
                style={GlobalStyles.fontBold}
              >
                {title}
              </Text>

              {/* <View className="flex-row justify-between items-center">
                    
                    <View className="flex-row items-center">
                      <Text
                        className="text-[#f9f9f9] text-xl"
                        style={GlobalStyles.fontBold}
                      >
                        $100
                      </Text>
                      <Text
                        className="text-[#f9f9f9]"
                        style={GlobalStyles.fontRegular}
                      >
                        /night
                      </Text>
                    </View>
                  </View> */}
            </View>

            {/* Rating  */}
            <View className="flex-row items-center my-2">
              <Star1 size="18" color="#E9FA00" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                {rating}
              </Text>
            </View>

            {/* Location  */}
            <View className="flex-row items-start my-2">
              <Location size="18" color="#E9FA00" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
                numberOfLines={1}
              >
                {location}
              </Text>
            </View>

            <HR customClass={"bg-[#f9f9f9] mt-3 mb-1"} />

            <View className="">
              <Text
                className="text-gray-400 text-xs"
                numberOfLines={1}
                style={GlobalStyles.fontRegular}
              >
                {shortDescription}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {/* TODO:  */}
    </>
  );
};

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
      <View className="w-80 h-80 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
        <ImageBackground
          source={{ uri: urlifiedImage }}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-full h-36"
        >
          {/* Button to Save Card */}
          <Pressable
            className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
            onPress={toggleSave}
          >
            <Heart
              size="24"
              color={isLiked ? "#FF26B9" : "#101010"}
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

          <View className="bg-[#101010]/50 w-full h-14 absolute bottom-0 justify-center items-center">
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

        {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
        <View className="flex-col p-4 w-full z-10">
          <View className="flex-row justify-between items-center">
            {/* Location Name */}
            <Text
              className="text-2xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {title}
            </Text>
          </View>

          {/* Time  */}
          <View className="flex-row items-center mt-2 space-x-1">
            <Car size={"18"} color="#FF26B9" variant="Bold" />
            <Text
              className="text-white text-base"
              style={GlobalStyles.fontRegular}
            >
              {
                (latitude,
                longitude ? (
                  <>{distance.toFixed(2)}Km from you</>
                ) : (
                  <>Fetch Live Location</>
                ))
              }
            </Text>
          </View>

          {/* Location  */}
          <View className="flex-row items-start mt-1 space-x-1">
            <Location size="18" color="#FF26B9" variant="Bold" />
            <Text
              className="text-base text-[#f9f9f9]"
              style={GlobalStyles.fontRegular}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>

          {/* Button  */}
          <Pressable
            className="p-2 mt-4 bg-[#E9FA00] active:bg-[#f1ff2f] rounded"
            onPress={() =>
              navigation.navigate("CafeDetails", {
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
            <Text className="text-[#101010] text-center">View Details</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const RecommendedCard = ({
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
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;
  return (
    <Pressable
      className="w-44 h-64 rounded-2xl overflow-hidden mx-2 bg-[#262223]"
      onPress={() =>
        navigation.navigate("CafeDetails", {
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
      <Image
        source={{ uri: urlifiedImage }}
        defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
        className="w-full h-32"
      />

      {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
      <View className="flex-col p-4 w-full space-y-1 z-10">
        <View className="flex-row justify-between items-center">
          {/* Location Name */}
          <Text
            className="text-xl text-[#f9f9f9]"
            style={GlobalStyles.fontBold}
          >
            {title}
          </Text>
        </View>

        <View className="">
          <Text
            className="text-gray-400 text-base"
            numberOfLines={2}
            style={GlobalStyles.fontRegular}
          >
            {shortDescription}
          </Text>
        </View>
      </View>
    </Pressable>
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
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;
  return (
    <View className="bg-white rounded-2xl w-64 h-24 p-2 flex-row space-x-2 mx-2">
      <View
        className="overflow-hidden rounded-xl"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 32,
          // backgroundColor: "#0000",
        }}
      >
        <Image
          source={{ uri: urlifiedImage }}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-20 h-20"
        />
      </View>

      <View className="space-y-1">
        <Text className="text-[#101010]" style={GlobalStyles.fontSemiBold}>
          {title}
        </Text>

        {/* Rating  */}
        <View className="flex-row items-center space-x-2 my-2">
          <View className="flex-row items-center">
            <Star1 size="18" color="#FF26B9" variant="Bold" />
            <Text className="text-[#101010]" style={GlobalStyles.fontMedium}>
              {rating}
            </Text>
          </View>

          <Text className="text-gray-400 text-center">•</Text>

          <View className="flex-row items-center">
            <Car size="16" color="#FF26B9" variant="Bold" />
            <Text className="text-[#101010]" style={GlobalStyles.fontMedium}>
              10Km
            </Text>
          </View>
        </View>

        <View className="p-1.5 bg-[#E9FA00] rounded-lg">
          <Text className="text-[#101010] text-center">View Details</Text>
        </View>
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
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("CafeDetails", {
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
        defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
        className="w-40 h-64 rounded-[30px] overflow-hidden mx-2"
      >
        <View className="absolute bg-[#101010]/30 w-full h-full" />
        <View className="flex-col absolute bottom-5 px-4 w-full space-y-1 z-10">
          {/* Location Name */}
          <Text
            className="text-xl text-[#f9f9f9]"
            style={GlobalStyles.fontBold}
          >
            {title}
          </Text>
          {/* Location  */}
          <View className="flex-row items-center">
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
            <View className="flex-row items-center">
              <Car size="18" color="#f9f9f9" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                40km
              </Text>
            </View>
            {/* Rating  */}
            <View className="flex-row items-center">
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

const IteratingCards = ({
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
}) => {
  const urlifiedImage = image ? urlFor(image).url() : null;
  const urlifiedProfileImage = ownerProfileImage
    ? urlFor(ownerProfileImage)?.url()
    : null;

  const [isLiked, setIsLiked] = useState(false);
  const toggleSave = () => {
    setIsLiked(!isLiked);
  };
  return (
    <>
      <View className="w-full h-80 rounded-[30px] overflow-hidden bg-[#262223] my-2">
        <ImageBackground
          source={{ uri: urlifiedImage }}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-full h-36"
        >
          {/* Button to Save Card */}
          <Pressable
            className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
            onPress={toggleSave}
          >
            <Heart
              size="24"
              color={isLiked ? "#FF26B9" : "#101010"}
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

          <View className="bg-[#101010]/50 w-full h-14 absolute bottom-0 justify-center items-center">
            <View className="w-full px-5">
              <View className="flex-row items-center space-x-2">
                {urlifiedProfileImage ? (
                  <Image
                    source={{
                      uri: urlifiedProfileImage,
                    }}
                    defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <Image
                    source={require("../assets/Images/User/Dummy-Profile.png")}
                    defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
                    className="w-10 h-10 rounded-full"
                  />
                )}

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

        {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
        <View className="flex-col p-4 w-full z-10">
          <View className="flex-row justify-between items-center">
            {/* Location Name */}
            <Text
              className="text-2xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {title}
            </Text>
          </View>

          {/* Time  */}
          <View className="flex-row items-center mt-2 space-x-1">
            <Car size={"18"} color="#FF26B9" variant="Bold" />
            <Text
              className="text-white text-base"
              style={GlobalStyles.fontRegular}
            >
              3Km from you
            </Text>
          </View>

          {/* Location  */}
          <View className="flex-row items-center mt-1 space-x-1">
            <Location size="18" color="#FF26B9" variant="Bold" />
            <Text
              className="text-base text-[#f9f9f9]"
              style={GlobalStyles.fontRegular}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>

          {/* Button  */}
          <Pressable
            className="p-2 mt-4 bg-[#E9FA00] active:bg-[#f1ff2f] rounded"
            onPress={() =>
              navigation.navigate("CafeDetails", {
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
            <Text className="text-[#101010] text-center">View Details</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};
