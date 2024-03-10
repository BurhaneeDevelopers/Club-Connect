import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SectionTitles from "./SectionTitles";
import Skeleton from "./Skeleton";
import * as Cards from "./FeaturedCards/FeaturedCards";
import UtilitiesFunctions from "./FeaturedCards/UtilitiesFunctions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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
      // console.log(allBusiness);
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

  const { calculateDistance, filterDataByCity } = UtilitiesFunctions();

  return (
    <View className="pb-3">
      {categories.map((category, index) => (
        <View key={index}>
          <View className="px-4 pb-6 pt-4">
            <SectionTitles title={category} />
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={true}
          >
            <View className="px-5 flex-row items-center overflow-hidden justify-center w-full">
              {loading ? (
                <>
                  <Skeleton
                    width={256}
                    height={90}
                    customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626] "
                  />
                  <Skeleton
                    width={256}
                    height={90}
                    customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626] "
                  />
                </>
              ) : (
                allBusiness[index] &&
                allBusiness[index].map((item, idx) => {
                  // Add a check here
                  switch (category) {
                    case "Explore in your city":
                      return (
                        <Cards.ExploreCard
                          key={idx}
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
                        />
                      );
                    case "Top picks near you":
                      return (
                        <Cards.TopPickCard
                          key={idx}
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
                        />
                      );
                    case "Recommended for you!":
                      return (
                        <Cards.PopularCards
                          key={idx}
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
                        />
                      );
                    default:
                      return null;
                  }
                })
              )}
            </View>
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

export default FeaturedHomeRow;
