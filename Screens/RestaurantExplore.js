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
  Gift,
} from "iconsax-react-native";
import { useState, useEffect } from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import axios from "axios";

// Components
import SectionTitles from "../Components/SectionTitles";
import HR from "../Components/HR";
import HotDealsSlider from "../Components/HotDealsSlider";



const RestaurantExplore = ({navigation}) => {

  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  

  const TopFoodPicks = [
    {
      title: "Biriyani",
      image: "",
    },
    {
      title: "Chicken",
      image: "",
    },
    {
      title: "Paratha",
      image: "",
    },
    {
      title: "Pizza",
      image: "",
    },
    {
      title: "Shawarma",
      image: "",
    },
    {
      title: "Sandwich",
      image: "",
    },
    {
      title: "Idly",
      image: "",
    },
    {
      title: "Dosa",
      image: "",
    },
  ];


  const [hotspotImages, setHotspotImages] = useState([]);
  UNSPLASH_ACCESS_KEY = "6KEJery9EMaZFtuiQjELpzqV5sgo9vVWqm52b_gKYZ4";



  const fetchHotspotImages = async () => {
    setLoading(true);
    try {
      // Generate a random query string to make the request unique
      const randomQuery = getRandomQuery(); // Define the getRandomQuery function

      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: randomQuery,
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      const images = response.data.results.map((result) => result.urls.regular);
      setHotspotImages(images);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  const getRandomQuery = () => {
    const queries = ["beach", "mountain", "city", "forest", "desert"];
    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
  };

  useEffect(() => {
    fetchHotspotImages();
  }, []);

  const HotspotCards = hotspotImages.map((image, index) => ({
    img: { uri: image },
    title: `Hotspot ${index + 1}`,
    location: "Unknown",
    price: "100",
    rating: "4.5",
  }));




  const fetchRestaurants = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://foodbukka.herokuapp.com/api/v1/menu', {
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here if needed
        },
      });
      const restaurantData = response.data; // Adjust this based on the actual API response structure

      setRestaurants(restaurantData);
      console.log(restaurantData);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row w-full items-center p-5">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute ml-5"
          >
            <ArrowLeft size="32" color="#f9f9f9" />
          </Pressable>

          <Text
            className="text-3xl text-[#FF26B9] mx-auto"
            style={GlobalStyles.fontSemiBold}
          >
            Restaurant
          </Text>
        </View>

        <View className="p-5">
          <View
            className={`flex-row justify-between rounded-xl p-3 border border-[#FF26B9]  ${
              clicked ? "bg-[#FF26B9]" : ""
            }`}
          >
            <View className="flex-row items-center w-72 gap-2">
              {/* search Icon */}
              <SearchNormal1 size={28} color="#f9f9f9" />
              {/* Input field */}
              <TextInput
                placeholder="Search for any Restaurant!"
                // value={searchData}
                // onChangeText={(text) => {
                //   setSearchData(text);
                //   handleSearch(); // Call the search function
                // }}
                onFocus={() => {
                  setClicked(true);
                }}
                placeholderTextColor={"#f9f9f9"}
                className="text-lg w-full"
              />

              {/* {console.log(searchData)} */}
            </View>

            {/* cross Icon, depending on whether the search bar is clicked or not */}
            {clicked && (
              <Add
                size={32}
                color="white"
                onPress={() => {
                  Keyboard.dismiss();
                  setClicked(false);
                  //   setSearchData("");
                }}
                className="rotate-45"
              />
            )}
          </View>
        </View>

        <View className="p-5">
          <SectionTitles title={"Quick Finds!"} />

          <View className="flex-row items-center justify-center space-x-5">
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Veg</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Non-Veg</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Starters</Text>
            </View>
            <View className="items-center space-y-3">
              <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
              <Text className="text-white">Chinese</Text>
            </View>
          </View>
        </View>

        <View className="p-5">
          <SectionTitles title={"Top Picks For You!"} />

          <View className="flex-row items-center justify-center space-x-5 flex-wrap">
            {TopFoodPicks.map((item, index) => {
              return <TopPickCards title={item.title} key={index} />;
            })}
          </View>
        </View>

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <View className="p-5">
            <SectionTitles title={"Hot Deals Just For You!"} />
          </View>

          <HotDealsSlider />
        </View>

        {/* TOP HOTSPOTS CARDS  */}
        <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="Top Picks Near You!" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row items-center justify-center">
              {HotspotCards.map((item, index) => {
                return (
                  <NearestPickCard
                    navigation={navigation}
                    key={index}
                    {...item}
                  />
                );
              })}
              {loading && <ActivityIndicator size="32" color="#E9FA00" />}
            </View>
          </ScrollView>
        </View>

        {/* COUPAN CARD  */}
        <CoupanCard />

        {/* PopularCards CARDS  */}
        <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="Popular Places!" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row items-center justify-center">
              {HotspotCards.map((item, index) => {
                return <PopularCafeCards key={index} {...item} />;
              })}
              {loading && <ActivityIndicator size="32" color="#E9FA00" />}
            </View>
          </ScrollView>
        </View>

        {/* Recommended CARDS  */}
        <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="All Places In Delhi!" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row items-center justify-center">
              {HotspotCards.map((item, index) => {
                return <RecommendedCard key={index} {...item} />;
              })}
              {loading && <ActivityIndicator size="32" color="#E9FA00" />}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RestaurantExplore

const TopPickCards = ({ title }) => {
  return (
    <>
      <View className="items-center space-y-3 mx-3">
        <View className="bg-gray-100 w-16 h-16 rounded-full mt-5"></View>
        <Text className="text-white">{title}</Text>
      </View>
    </>
  );
};

const NearestPickCard = ({
  title,
  img,
  location,
  price,
  rating,
  navigation,
}) => {
  return (
    <>
      <Pressable onPress={() => navigation.navigate("CafeDetails")}>
        <View className="w-72 h-72 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <Image source={img} className="w-full h-32" />
          {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
          <View className="flex-col p-4 w-full space-y-1 z-10">
            <View className="flex-row justify-between items-center">
              {/* Location Name */}
              <Text
                className="text-2xl text-[#f9f9f9]"
                style={GlobalStyles.fontBold}
              >
                {title}
              </Text>

              <View className="flex-row justify-between items-center">
                {/* Price  */}
                <View className="flex-row items-center">
                  <Text
                    className="text-[#f9f9f9] text-xl"
                    style={GlobalStyles.fontBold}
                  >
                    ${price}
                  </Text>
                  <Text
                    className="text-[#f9f9f9]"
                    style={GlobalStyles.fontRegular}
                  >
                    /night
                  </Text>
                </View>
              </View>
            </View>

            {/* Rating  */}
            <View className="flex-row items-center">
              <Star1 size="18" color="#E9FA00" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                {rating}
              </Text>
            </View>

            {/* Location  */}
            <View className="flex-row items-center">
              <Location size="18" color="#E9FA00" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
              >
                {location}
              </Text>
            </View>

            <HR customClass={"bg-[#f9f9f9] mt-3 mb-1"} />

            <View>
              <Text
                className="text-gray-400 text-xs"
                style={GlobalStyles.fontRegular}
              >
                Follows all safety measures for a clean and hygiene food
                experience
              </Text>
            </View>
          </View>
        </View>
      </Pressable>


      {/* TODO:  */}
    </>
  );
};
const PopularCafeCards = ({ title, img, location }) => {
  return (
    <>
      <View>
        <View className="w-72 h-80 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <ImageBackground source={img} className="w-full h-36">
            {/* Button to Save Card */}
            <Pressable className="bg-[#E9FA00] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5">
              <Heart size="24" color="#101010" />
            </Pressable>

            <View className="bg-black/50 justify-center items-center py-1 px-2 absolute top-3 rounded-lg left-5">
              <Text
                className="text-lg text-[#f9f9f9]"
                style={GlobalStyles.fontMedium}
              >
                Restaurant
              </Text>
            </View>

            <View className="bg-[#101010]/50 w-full h-14 absolute bottom-0 justify-center items-center">
              <View className="w-full px-5">
                <View className="flex-row items-center space-x-2">
                  <Image
                    source={require("../assets/Illustrations/Avatar.jpg")}
                    className="w-10 h-10 rounded-full"
                  />
                  <Text
                    className="text-lg text-[#f9f9f9]"
                    style={GlobalStyles.fontMedium}
                  >
                    Magesh Bhagat
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
            <View className="flex-row items-center mt-2">
              <Clock size={"24"} color="#FF26B9" variant="Bold" />
              <Text className="text-white text-base">From 9Pm to 10Pm</Text>
            </View>

            {/* Location  */}
            <View className="flex-row items-center mt-1">
              <Location size="24" color="#FF26B9" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
              >
                {location}
              </Text>
            </View>

            <View className="p-2 mt-4 bg-[#E9FA00] rounded">
              <Text className="text-[#101010] text-center">View Details</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};



const RecommendedCard = ({ title, img, location, price, rating }) => {
  return (
    <>
      <View>
        <View className="w-64 h-64 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <Image source={img} className="w-full h-32" />
          {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
          <View className="flex-col p-4 w-full space-y-1 mt-3 z-10">
            <View className="flex-row justify-between items-center">
              {/* Location Name */}
              <Text
                className="text-2xl text-[#f9f9f9]"
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
                Follows all safety measures for a clean and hygiene food
                experience Lorem ipsum dolor sit amet.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};




const CoupanCard = () => {
  return (
    <View className="p-5">
      <View className="bg-[#262223] h-24 rounded-2xl w-full p-5">
        <View className="flex-row gap-2 items-center">
          {/* ICON GIFT  */}
          <View className="bg-[#FF26B9] p-2 rounded-xl">
            <Gift size="44" color="#E9FA00" />
          </View>

          {/* OFFER CONTENT  */}
          <View className="">
            <Text
              className="text-[#E9FA00] text-2xl"
              style={GlobalStyles.fontSemiBold}
            >
              CLAIM
              <Text className="text-[#FF26B9]"> FREE </Text>
              PESO!
            </Text>
            <Text
              className="text-[#f9f9f9] text-xs w-64"
              style={GlobalStyles.fontRegular}
            >
              Share the app and win your 100 peso in your wallet!
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
