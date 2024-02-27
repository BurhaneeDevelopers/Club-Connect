import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SectionTitles from "./SectionTitles";
import client from "../sanity";
import useLocation from "../Hooks/useLocation";
import Skeleton from "./Skeleton";
import * as Cards from "./FeaturedCards/FeaturedCards";
import UtilitiesFunctions from "./FeaturedCards/UtilitiesFunctions";

const FeaturedHomeRow = ({ id, title, navigation, featuredId, dataType }) => {
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
            // console.log("DATAAAAAAAAAAA", data)
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInFeaturedCategory();
  }, []);

  // const { latitude, longitude } = useLocation();

  // useEffect(() => {
  //   // console.log("LAT", latitude);
  //   // console.log("LONG", longitude);
  // }, [latitude, longitude]);

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
    <View className="pb-3">
      <View className="px-4 pb-6 pt-4">
        {/* Featured Title like `Hot Deals Just For You!, Top Picks!` */}
        <SectionTitles title={title} />
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
      >
        {/* {loading && (
          <Skeleton animation="pulse" circle="true" width={370} height={200} />
        )} */}
        <View className="px-5 flex-row items-center overflow-hidden justify-center w-full">
          {featuredId == 4 &&
            (loading ? (
              <>
                <Skeleton
                  width={256}
                  height={90}
                  customClass="rounded-[30px] mx-2 overflow-hidden bg-[#262626] "
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
          {featuredId == 5 &&
            (loading ? (
              <>
                <Skeleton
                  width={150}
                  height={256}
                  customClass="rounded-[30px] mx-2 overflow-hidden"
                />
                <Skeleton
                  width={150}
                  height={256}
                  customClass="rounded-[30px] mx-2 overflow-hidden"
                />
                <Skeleton
                  width={150}
                  height={256}
                  customClass="rounded-[30px] mx-2 overflow-hidden"
                />
              </>
            ) : (
              renderCards(itemData, Cards.TopPickCard)
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
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedHomeRow;
