import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HotDealsSlider from "../Components/HotDealsSlider";
import {
  SearchNormal1,
  Buildings2,
  Coffee,
  Building,
  Shop,
  Location,
  Star1,
  Gift,
  Bill,
  SearchNormal,
  Gps,
} from "iconsax-react-native";
import axios from "axios";
import Banner1 from "../assets/Banners/Banner-1.svg";
import HR from "../Components/HR";
import LottieView from "lottie-react-native";

// Contexts
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

// Components
import SectionTitles from "../Components/SectionTitles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import FeaturedHomeRow from "../Components/FeaturedHomerow";
import client from "../sanity";

// RN ELEMENTS
import { Skeleton } from "@rneui/themed";

const HomeScreen = ({ navigation, route }) => {
  // FIRE CONFETTI when user signs In for the first Time anonymously
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const animation = useRef(null);

  const handleAnimationFinish = () => {
    setAnimationPlayed(true);
  };

  useEffect(() => {
    // Check if the animation has already been played
    if (!animationPlayed) {
      AsyncStorage.getItem("playAnimation")
        .then((playAnimation) => {
          if (playAnimation === "true") {
            // Play the animation
            animation.current?.play();

            AsyncStorage.setItem("playAnimation", "false");
          }
        })
        .catch((error) => {
          console.error("Error checking AsyncStorage:", error);
        });
    }
  }, [animationPlayed]);

  // Refresh API when user reloads
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [hotspotImages, setHotspotImages] = useState([]);
  UNSPLASH_ACCESS_KEY = "6KEJery9EMaZFtuiQjELpzqV5sgo9vVWqm52b_gKYZ4";

  const fetchHotspotImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: "resorts", // You can modify the query to match your requirements
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

  useEffect(() => {
    fetchHotspotImages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHotspotImages();
    getUserEditedData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const HotspotCards = hotspotImages.map((image, index) => ({
    img: { uri: image },
    title: `Hotspot ${index + 1}`,
    location: "Unknown",
    price: "100",
    rating: "4.5",
  }));

  const [editedProfileData, setEditedProfileData] = useState({}); // Initialize as an empty object

  const getUserEditedData = async () => {
    const userEditedData = await AsyncStorage.getItem("userEditedData");

    if (userEditedData) {
      const parsedUserEditedData = JSON.parse(userEditedData);
      setEditedProfileData(parsedUserEditedData);
    }
  };

  useEffect(() => {
    getUserEditedData();
  }, []);

  useEffect(() => {
    const hasSignedIn = AsyncStorage.getItem("hasSignedIn");
    if (!hasSignedIn) {
      // Redirect to sign-in page if the user hasn't signed in
      navigation.navigate("SignIn");
    }
  }, [navigation]);

  // Display Dummy Random UserName and Name when username not set
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the Name and UserName from AsyncStorage
    AsyncStorage.getItem("Name")
      .then((storedName) => {
        if (storedName) {
          setName(storedName);
        }
      })
      .catch((error) => {
        console.error("Error retrieving Name:", error);
      });

    AsyncStorage.getItem("UserName")
      .then((storedUserName) => {
        if (storedUserName) {
          setUserName(storedUserName);
        }
      })
      .catch((error) => {
        console.error("Error retrieving UserName:", error);
      });
  }, []);

  // Fetch UserName and other Details when user edits his profile
  const { userDetails } = useContext(UserDetailsContext);

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  const [clicked, setClicked] = useState(false);

  const [featuredCategory, setFeaturedCategory] = useState([]);

  useEffect(() => {
    // Fetch Categories for restaurant like Top picks near you, Recommended for you!
    const fetchCategoriesForRestaurant = () => {
      try {
        client
          .fetch(
            `*[_type == "featured"]{
              ...,
              restaurants -> {
                ...,
                dishes[]->
              },
              cafes -> {
                ...,
                dishes[]->
              },
            }
          `
          )
          .then((data) => {
            setFeaturedCategory(data);
            // console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoriesForRestaurant();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className=""
    >
      {!animationPlayed && (
        <LottieView
          ref={animation}
          loop={false}
          autoPlay={false}
          onAnimationFinish={handleAnimationFinish}
          className={`w-[700px] h-[1000px] absolute left-0 items-start justify-start top-0 -translate-x-20 ${
            !animationPlayed ? "" : ""
          }`}
          source={require("../assets/Illustrations/confetti.json")}
        />
      )}

      <SafeAreaView className="h-full w-full">
        <View className="rounded-b-3xl bg-[#E9FA00]">
          {/* MENU  */}
          <View className="flex-row justify-between items-center p-5">
            {/* USERNAME AND SEARCH MENU  */}
            <Pressable
              className="flex-row items-center space-x-2"
              onPress={() => navigation.navigate("Profile")}
            >
              {userDetails?.profileImage ? (
                <Image
                  source={{ uri: userDetails.profileImage }}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <Image
                  source={require("../assets/Illustrations/Avatar.jpg")}
                  className="w-16 h-16 rounded-full"
                />
              )}

              <View className="">
                <Text
                  className="text-xl text-[#FF26B9]"
                  style={GlobalStyles.fontSemiBold}
                >
                  {userDetails?.name || name || (
                    <Skeleton animation="pulse" width={140} height={10} />
                  )}
                  {/* {console.log(userDetails?.name)} */}
                </Text>
                <Text
                  className="text-[#101010]"
                  style={GlobalStyles.fontMedium}
                >
                  {userDetails?.userName || userName || (
                    <Skeleton animation="pulse" width={120} height={10} />
                  )}
                </Text>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("LocationPick")}>
              <Gps size={28} color="#101010" />
            </Pressable>
          </View>

          {/* SearchBar  */}
          <View className="p-5">
            <View
              className={`flex-row justify-between rounded-xl p-3 bg-[#f9f9f9] overflow-hidden  ${
                clicked ? "bg-[#FF26B9]" : ""
              }`}
            >
              <View className="flex-row items-center w-72 gap-3 overflow-hidden">
                {/* search Icon */}
                <SearchNormal
                  size={22}
                  color={clicked ? "#f9f9f9" : "#101010"}
                />

                {/* Input field */}
                <TextInput
                  placeholder="Search for any Event, Cafe..."
                  onFocus={() => {
                    setClicked(true);
                  }}
                  placeholderTextColor={clicked ? "#f9f9f9" : "#101010"}
                  className="text-lg w-full"
                  style={GlobalStyles.fontSemiBold}
                />
              </View>
            </View>
          </View>
          {/* SearchBar End  */}
        </View>

        {/* AUTO SLIDING HOT DEALS  */}
        <View className="">
          <HotDealsSlider />
        </View>

        <View className="p-5">
          {/* MENU CARDS  */}
          <View className="pb-4">
            <SectionTitles title="Discover" />
          </View>

          <ScrollView
            horizontal={true}
            className=""
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex-row">
              <MenuCards
                icon={<Buildings2 size="32" color="#f9f9f9" variant="Broken" />}
                title="Hotspot"
                navigateTo={"HotspotExplore"}
                navigation={navigation}
              />

              <MenuCards
                icon={<Coffee size="32" color="#f9f9f9" variant="Broken" />}
                title="Cafe"
                navigateTo={"CafeExplore"}
                navigation={navigation}
              />
              <MenuCards
                icon={<Bill size="32" color="#f9f9f9" variant="Broken" />}
                title="Restaurant"
                navigateTo={"RestaurantExplore"}
                navigation={navigation}
              />
              <MenuCards
                icon={<Building size="32" color="#f9f9f9" variant="Broken" />}
                title="Bars"
                navigateTo={"BarsExplore"}
                navigation={navigation}
              />
              <MenuCards
                icon={<Shop size="32" color="#f9f9f9" variant="Broken" />}
                title="Pubs"
                navigateTo={"PubsExplore"}
                navigation={navigation}
              />

              <MenuCards
                icon={<Location size="32" color="#f9f9f9" variant="Broken" />}
                title="Map"
                navigateTo={"LocationPick"}
                navigation={navigation}
              />
            </View>
          </ScrollView>
        </View>

        {/* TOP HOTSPOTS CARDS  */}
        {/* <View className="py-5">
          <View className="px-5 pb-4">
            <SectionTitles title="Top Hotspots" />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="px-5 flex-row items-center justify-center">
              {HotspotCards.map((item, index) => {
                return <TopPickCard key={index} {...item} />;
              })}
              {loading && <ActivityIndicator size="32" color="#E9FA00" />}
            </View>
          </ScrollView>
        </View> */}

        {/* COUPAN CARD  */}
        <CoupanCard />

        {featuredCategory?.map((category, index) => {
          return (
            <FeaturedHomeRow
              key={category.id}
              id={category._id}
              title={category.name}
              navigation={navigation}
              featuredId={category.featuredId}
              dataType={["restaurants", "cafes"]}
            />
          );
        })}

        <View className="justify-center items-center p-5">
          {/* <Banner1 width={320} height={60} /> */}
        </View>
        {/* <View className="justify-center items-center py-5">
        <CustomBanner />
        </View> */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const MenuCards = ({ icon, title, navigateTo, navigation }) => {
  return (
    <>
      <Pressable
        className="bg-[#FF26B9] active:bg-[#c52d95] rounded-lg p-2 px-5 justify-center items-center flex-col mx-2"
        onPress={() => navigation.navigate(navigateTo)}
      >
        {/* {icon} */}
        <Text
          style={GlobalStyles.fontSemiBold}
          className="text-[#fff] text-base"
        >
          {title}
        </Text>
      </Pressable>
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

// const CustomBanner = () =>{
//   return(
//     <>
//     <View>
//       <ImageBackground source={Banner1} className="w-40 h-64 rounded-[30px] overflow-hidden mx-2">

//       </ImageBackground>
//     </View>
//     </>
//   )
// }
