import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import SectionTitles from "./SectionTitles";
import * as Cards from "./FeaturedCards/FeaturedCards";
import UtilitiesFunctions from "./FeaturedCards/UtilitiesFunctions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useSelectedCity from "../Hooks/useSelectedCity";
import useLocation from "../Hooks/useLocation";
import Skeleton from "./Skeleton";

const categories = [
  "Explore in your city",
  "Top picks near you",
  "Recommended for you!",
];

const FeaturedHomeRow = ({ navigation }) => {
  const { latitude, longitude } = useLocation();
  const { selectedCity } = useSelectedCity();
  const { calculateDistance } = UtilitiesFunctions();
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisibleData] = useState([]);

  const fetchAllBusiness = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const querySnapshot = await getDocs(
        query(collection(db, "Products"), where("city", "==", selectedCity))
      );
      const businesses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const dividedData = {
        [categories[0]]: [],
        [categories[1]]: [],
        [categories[2]]: [],
      };

      let currentCategoryIndex = 0;
      businesses.forEach((business, index) => {
        dividedData[categories[currentCategoryIndex]].push(business);
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      });

      setVisibleData(dividedData);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching business: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBusiness();
  }, [selectedCity]);

  return (
    <View className="p-5">
      {categories.map((category, index) => (
        <View key={index}>
          <View className="pb-6 pt-4">
            <SectionTitles title={category} />
          </View>
          <View className="">
            {loading ? (
              <View className="flex-row">
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
              </View>
            ) : (
              <FlatList
                horizontal
                data={visibleData[category]} // Use visibleData instead of allData
                renderItem={({ item }) => {
                  const distance = calculateDistance(
                    latitude,
                    longitude,
                    item?.latitude,
                    item?.longitude
                  );

                  switch (category) {
                    case "Explore in your city":
                      return (
                        <Cards.ExploreCard
                          id={item?.id}
                          image={item?.productImage}
                          rating={item?.rating}
                          title={item?.name}
                          location={item?.address}
                          shortDescription={item?.shortDescription}
                          openingTime={item?.hours}
                          ownerProfileImage={item?.productImage}
                          lat={item?.latitude}
                          long={item?.longitude}
                          distance={distance}
                          navigation={navigation}
                        />
                      );
                    case "Top picks near you":
                      return (
                        <Cards.TopPickCard
                          id={item?.id}
                          image={item?.productImage}
                          rating={item?.rating}
                          title={item?.name}
                          location={item?.address}
                          shortDescription={item?.shortDescription}
                          openingTime={item?.hours}
                          ownerProfileImage={item?.productImage}
                          lat={item?.latitude}
                          long={item?.longitude}
                          distance={distance}
                          navigation={navigation}
                        />
                      );
                    case "Recommended for you!":
                      return (
                        <Cards.PopularCards
                          id={item?.id}
                          image={item?.productImage}
                          rating={item?.rating}
                          title={item?.name}
                          location={item?.address}
                          shortDescription={item?.shortDescription}
                          openingTime={item?.hours}
                          ownerProfileImage={item?.productImage}
                          lat={item?.latitude}
                          long={item?.longitude}
                          distance={distance}
                          navigation={navigation}
                        />
                      );
                    default:
                      return null; // Handle default case or unknown card type
                  }
                }}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                  // Implement infinite loading logic here
                }}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                initialNumToRender={2}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default FeaturedHomeRow;
