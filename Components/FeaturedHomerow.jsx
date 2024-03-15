import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import SectionTitles from "./SectionTitles";
import * as Cards from "./FeaturedCards/FeaturedCards";
import UtilitiesFunctions from "./FeaturedCards/UtilitiesFunctions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useSelectedCity from "../Hooks/useSelectedCity";
import useLocation from "../Hooks/useLocation";
import Skeleton from "./Skeleton";

const categories = [
  "Explore in your city",
  "Top picks near you",
  "Recommended for you!",
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FeaturedHomeRow = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [allBusiness, setAllBusiness] = useState([]);
  const { selectedCity } = useSelectedCity();
  const { latitude, longitude } = useLocation();
  const { calculateDistance } = UtilitiesFunctions();
  const [renderedItems, setRenderedItems] = useState(3);

  const fetchAllBusiness = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const businesses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const shuffledBusinesses = shuffleArray(businesses);
      distributeBusinesses(shuffledBusinesses);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching business: ", error);
    }
  };

  const distributeBusinesses = (businesses) => {
    const distributedBusinesses = [[], [], []]; // Three categories
    let currentIndex = 0;
    businesses.forEach((business, index) => {
      distributedBusinesses[currentIndex].push(business);
      currentIndex = (currentIndex + 1) % 3; // Distribute evenly among three categories
    });
    setAllBusiness(distributedBusinesses);
  };

  useEffect(() => {
    fetchAllBusiness();
  }, []);

  const loadMoreData = () => {
    setLoading(true);
    try {
      // Increase the number of rendered items by 5
      setRenderedItems((prev) => prev + 3);
      setLoading(false);
    } catch (error) {}
  };

  const renderItem = ({ item, index, category }) => {
    if (index >= renderedItems) return null; // Render only items within the renderedItems limit
    const distance = calculateDistance(
      latitude,
      longitude,
      item?.latitude,
      item?.longitude
    );

    let CardComponent;
    switch (category) {
      case "Explore in your city":
        CardComponent = Cards.ExploreCard;
        break;
      case "Top picks near you":
        CardComponent = Cards.TopPickCard;
        break;
      case "Recommended for you!":
        CardComponent = Cards.PopularCards;
        break;
      default:
        CardComponent = null;
    }

    if (CardComponent) {
      return (
        <CardComponent
          key={index}
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
          calculateDistance={calculateDistance}
          navigation={navigation}
          distance={distance}
        />
      );
    } else {
      return null;
    }
  };

  const memoizedRenderItem = useMemo(
    () => renderItem,
    [renderedItems, loading]
  );

  return (
    <View className="pb-3">
      {categories.map((category, index) => (
        <View key={index}>
          <View className="px-4 pb-6 pt-4">
            <SectionTitles title={category} />
          </View>

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
              data={allBusiness[index]}
              renderItem={({ item, index }) =>
                memoizedRenderItem({ item, index, category })
              }
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                loading ? (
                  <ActivityIndicator />
                ) : (
                  <ActivityIndicator size={"large"} className="ml-4 my-auto" />
                )
              }
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default FeaturedHomeRow;
