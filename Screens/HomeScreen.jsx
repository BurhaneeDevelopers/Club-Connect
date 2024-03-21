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
  Modal,
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
  Gift,
  Bill,
  Add,
  SearchNormal,
  ArrowLeft,
  Notification,
} from "iconsax-react-native";
import LottieView from "lottie-react-native";
import FeaturedHomeRow from "../Components/FeaturedHomerow";

// Components
import SectionTitles from "../Components/SectionTitles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExploreSlider from "../Components/ExploreSlider";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";

// SANITY
import client from "../sanity";
import useAuth from "../Hooks/useAuth";

const HomeScreen = ({ navigation }) => {
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Fetch UserName and other Details when user edits his profile
  const { user } = useAuth();

  // console.log(
  //   "FEATURED",
  //   featuredCategory.forEach(({ lounges }) => console.log(lounges))
  // );

  // useEffect(() => {
  //   AsyncStorage.clear();
  //   console.log("Local storage Cleared");
  // }, []);

  const promoCardData = [
    {
      title: "Explore VibeCity",
      desc: "Events Elevated, Effortlessly Executed!",
      image: require("../assets/Illustrations/DiscoverVibeCity.png"),
      color: "#FF26B9",
      redirectTo: "HostWithUs",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
    {
      title: "Discover Events",
      desc: "Thrilling Moments Awaits You!",
      image: require("../assets/Illustrations/DiscoverEvents.png"),
      color: "#E9FA00",
      redirectTo: "VibeCity",
      textColor: "#000000",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
  ];

  return (
    <SafeAreaView>
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

        <View className="h-full w-full">
          {/* MENU  */}
          <View className="flex-row w-full justify-between items-center p-5">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute ml-5"
            >
              <ArrowLeft size="32" color="#f9f9f9" />
            </Pressable>

            <Text
              className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
              style={GlobalStyles.fontSemiBold}
              numberOfLines={1}
            >
              Home
            </Text>

            {/* Button to Save Cafe */}
            {/* <Pressable
            
              className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
              onPress={toggleSave}
            >
              <SearchNormal
                size="24"
                color={isLiked ? "#FF26B9" : "#000000"}
                variant={isLiked ? "Bold" : "Outline"}
              />
            </Pressable> */}
            <Pressable
              className="border-2 border-[#FF26B9] rounded-full absolute top-3 right-5"
              onPress={() => navigation.navigate("Profile")}
            >
              {user?.profileImage ? (
                <Image
                  source={{ uri: user?.profileImage }}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <Image
                  source={require("../assets/Images/User/Dummy-Profile.png")}
                  className="w-10 h-10 rounded-full"
                />
              )}
            </Pressable>
          </View>

          {/* AUTO SLIDING HOT DEALS  */}
          <View className="">
            {/* <ExploreSlider /> */}
          </View>

          <View className="p-5 justify-center items-center">
            <SectionTitles title="Grab Opportunities!" />
          </View>

          <View className="flex-row flex-wrap justify-center items-center">
            {promoCardData.map((item, index) => {
              // Assuming Promocards has even length. To always keep 2 in one row
              if (index % 2 === 0) {
                return (
                  <View key={index / 2} className="flex-row">
                    <PromoCard
                      navigation={navigation}
                      title={promoCardData[index].title}
                      desc={promoCardData[index].desc}
                      image={promoCardData[index].image}
                      redirectTo={promoCardData[index].redirectTo}
                      color={promoCardData[index].color}
                      activeBgColor={promoCardData[index].activeBgColor}
                      textColor={promoCardData[index].textColor}
                      descColor={promoCardData[index].descColor}
                    />
                    {index + 1 < promoCardData.length && (
                      <PromoCard
                        navigation={navigation}
                        title={promoCardData[index + 1].title}
                        desc={promoCardData[index + 1].desc}
                        image={promoCardData[index + 1].image}
                        redirectTo={promoCardData[index + 1].redirectTo}
                        color={promoCardData[index + 1].color}
                        activeBgColor={promoCardData[index + 1].activeBgColor}
                        textColor={promoCardData[index + 1].textColor}
                        descColor={promoCardData[index + 1].descColor}
                      />
                    )}
                  </View>
                );
              }
              return null;
            })}
          </View>

          <View className="py-4">
            {/* MENU CARDS  */}
            <View className="pb-6 px-5">
              <SectionTitles title="Discover" />
            </View>

            <ScrollView
              horizontal={true}
              className=""
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex-row">
                <Pressable
                  className="bg-[#FF26B9] active:bg-[#c52d95] rounded-lg p-2 px-5 justify-center items-center flex-col mx-2"
                  onPress={() =>
                    navigation.navigate("UnAuthenticate", {
                      screen: "LocationPick",
                    })
                  }
                >
                  {/* {icon} */}
                  <Text
                    style={GlobalStyles.fontSemiBold}
                    className="text-[#fff] text-sm"
                  >
                    Change Location
                  </Text>
                </Pressable>

                <MenuCards
                  icon={<Coffee size="32" color="#f9f9f9" variant="Broken" />}
                  title="Cafe"
                  navigateTo={"CafeExplore"}
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
                  title="Lounge"
                  navigateTo={"LoungeExplore"}
                  navigation={navigation}
                />
              </View>
            </ScrollView>
          </View>

          <FeaturedHomeRow
            // title={category}
            dataType={["pubs", "cafes", "bars", "lounges"]}
            navigation={navigation}
          />

          {/* <View className="justify-center items-center p-5"> */}
          {/* <Banner1 width={320} height={60} /> */}
          {/* </View> */}
          {/* <View className="justify-center items-center py-5">
        <CustomBanner />
        </View> */}
          {/* COUPAN CARD  */}
          <View className="flex-row w-full  justify-center items-center p-5">
            <CoupanCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
        <Text style={GlobalStyles.fontSemiBold} className="text-[#fff] text-sm">
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

const PromoCard = ({
  navigation,
  redirectTo,
  image,
  title,
  desc,
  color,
  textColor,
  descColor,
  activeBgColor,
}) => {
  return (
    <Pressable
      className={`bg-[${color}] active:bg-[${activeBgColor}] h-60 w-44 rounded-3xl overflow-hidden py-4 px-1 m-2`}
      onPress={() => navigation.navigate(redirectTo)}
    >
      <Text
        className={`text-[${textColor}] text-lg text-center`}
        style={GlobalStyles.fontBold}
      >
        {title}
      </Text>
      <Text
        className={`text-[${descColor}] text-center text-xs`}
        style={GlobalStyles.fontSemiBold}
      >
        {desc}
      </Text>

      {/* <LottieView
        ref={animation}
        autoPlay
        loop
        className="w-32 h-32 absolute right-0 top-0"
        source={require("../assets/Illustrations/ExploreParty.json")}
      /> */}

      <View className="px-5">
        <Image
          source={image}
          className="w-full h-32 mx-auto mt-5"
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
};
