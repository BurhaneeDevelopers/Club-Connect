import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import SectionTitles from "./SectionTitles";
import client, { urlFor } from "../sanity";
import { Car, Heart, Location, Star1, Timer1 } from "iconsax-react-native";
import HR from "./HR";
import useLocation from "../Hooks/useLocation";

import Skeleton from "./Skeleton";
import UtilitiesFunctions from "./FeaturedCards/UtilitiesFunctions";
import * as Cards from "./FeaturedCards/FeaturedCards";

const FeaturedRow = ({ id, title, navigation, featuredId, dataType }) => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataInFeaturedCategory = () => {
      setLoading(true);

      try {
        client
          .fetch(
            `*[_type == "featured" && _id == $id]{
              ...,
              ${dataType}[] -> {
                ...,
                dishes[]->,
                type-> {
                  name
                    }
                  },
              }[0]
          `,
            { id, dataType }
          )
          .then((data) => {
            setItemData(data?.[dataType]);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInFeaturedCategory();
  }, []);

  const { calculateDistance, filterDataByCity } = UtilitiesFunctions();

  const renderCards = (itemData, FeaturedCards) => {
    const filteredData = filterDataByCity(itemData);

    return (
      <>
        {filteredData.length === 0 ? (
          <Text className="text-white" style={GlobalStyles.fontRegular}>
            STAY TUUUUNED!! We are coming to your city...
          </Text>
        ) : (
          filteredData.map((item, index) => (
            <FeaturedCards
              key={index}
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
          ))
        )}
      </>
    );
  };

  return (
    <View>
      <View className="p-5">
        {/* Featured Title like `Hot Deals Just For You!, Top Picks!` */}
        <SectionTitles title={title} />
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* {loading && <ActivityIndicator size="32" color="#E9FA00" />} */}
        <View className="px-5 flex-row items-center justify-center w-full">
          {featuredId == 5 &&
            (loading ? (
              <>
                <Skeleton
                  width={150}
                  height={256}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={150}
                  height={256}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={150}
                  height={256}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
              </>
            ) : (
              renderCards(itemData, Cards.TopPickCard)
            ))}

          {featuredId == 1 &&
            (loading ? (
              <>
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
              </>
            ) : (
              renderCards(itemData, NearestPickCard)
            ))}
          {featuredId == 4 &&
            (loading ? (
              <>
                <Skeleton
                  width={256}
                  height={90}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={256}
                  height={90}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={256}
                  height={90}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
              </>
            ) : (
              renderCards(itemData, Cards.ExploreCard)
            ))}
          {featuredId == 2 &&
            (loading ? (
              <>
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
              </>
            ) : (
              renderCards(itemData, Cards.PopularCafeCards)
            ))}
          {featuredId == 3 &&
            (loading ? (
              <>
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
                <Skeleton
                  width={320}
                  height={320}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626]"
                />
              </>
            ) : (
              renderCards(itemData, RecommendedCard)
            ))}
        </View>
      </ScrollView>
      {/* <View className="p-5">{renderCards(itemData, IteratingCards)}</View> */}
    </View>
  );
};

export default FeaturedRow;

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
        <View className="w-72 h-72 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <Image
            source={{ uri: urlifiedImage }}
            defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
            className="w-full h-32"
          />

          {/* <View className="absolute bg-[#000000]/30 w-full h-full" /> */}
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
      <Image
        source={{ uri: urlifiedImage }}
        defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
        className="w-full h-32"
      />

      {/* <View className="absolute bg-[#000000]/30 w-full h-full" /> */}
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

