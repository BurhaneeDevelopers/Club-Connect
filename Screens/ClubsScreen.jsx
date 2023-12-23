import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Gift,
  SearchNormal,
  ArrowLeft,
  Illustrator,
  Global,
  People,
} from "iconsax-react-native";
// import LottieView from "lottie-react-native";
import MasonryList from "@react-native-seoul/masonry-list";

// Illustration
// import DiscoverClubs from "../assets/Illustrations/DiscoverClub.svg";
import CreateClub from "../assets/Illustrations/CreateClub.svg";
import JoinClub from "../assets/Illustrations/JoinClub.svg";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import SectionTitles from "../Components/SectionTitles";

const ClubsScreen = ({ navigation }) => {
  // const animation = useRef();
  // useEffect(() => {
  //   animation.current?.play();

  //   // Or set a specific startFrame and endFrame with:
  //   animation.current?.play(30, 120);
  // }, []);

  const RedirectCardData = [
    {
      title: "Create Club",
      desc: "Create your own Private or Public Club!",
      image: <CreateClub width={85} height={85} />,
      color: "#FF26B9",
      redirectTo: "Index",
      textColor: "#f9f9f9",
      descColor: "#fff",
      activeBgColor: "#bb3691",
    },
    {
      title: "Join Club",
      desc: "Join the Marvelous Club Community of VHS",
      image: <JoinClub width={75} height={75} />,
      color: "#E9FA00",
      redirectTo: "VibeCity",
      textColor: "#FF26B9",
      descColor: "#575757",
      activeBgColor: "#f1ff2f",
    },
  ];

  data = [
    {
      id: "1",
      image:
        "https://images.pexels.com/photos/1334605/pexels-photo-1334605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Vibecity",
      bgColor: "bg-[#E9FA00]/40",
      textColor: "#101010",
    },
    {
      id: "2",
      image:
        "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Top Clubs",
      bgColor: "bg-[#FF26B9]/50",
      textColor: "#f9f9f9",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/63507/pexels-photo-63507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Best Cafe",
      bgColor: "bg-[#FF26B9]/50",
      textColor: "#f9f9f9",
    },
    {
      id: "4",
      image:
        "https://images.pexels.com/photos/2385210/pexels-photo-2385210.jpeg",
      title: "Top Rated",
      bgColor: "bg-[#E9FA00]/40",
      textColor: "#101010",
    },
  ];
  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex-row w-full justify-between items-center px-5 py-3">
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
            Discover Clubs
          </Text>

          {/* Button to Save Cafe */}
          <Pressable className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-4 right-5">
            <SearchNormal size="24" color={"#101010"} variant={"Outline"} />
          </Pressable>
        </View>

        <View className="">
          {/* <LottieView
            ref={animation}
            loop
            className="w-52 h-52"
            source={require("../assets/Illustrations/DiscoverClub.json")}
          /> */}
          {/* <DiscoverClubs width={420} height={420} /> */}
        </View>

        <View className="my-5">
          <SectionTitles title="Be a part of our community!" />

          <View className="flex-row flex-wrap justify-center items-center mt-3">
            {RedirectCardData.map((item, index) => {
              return (
                <RedirectingCards
                  key={index}
                  navigation={navigation}
                  title={item?.title}
                  desc={item?.desc}
                  image={item?.image}
                  redirectTo={item?.redirectTo}
                  color={item?.color}
                  activeBgColor={item?.activeBgColor}
                  textColor={item?.textColor}
                  descColor={item?.descColor}
                />
              );
            })}
          </View>
        </View>

        <View className="py-3">
          <SectionTitles title="Nightout Clubs" />

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={true}
          >
            <View className="flex-row items-center overflow-hidden justify-center w-full mt-5">
              <ExploreCard navigation={navigation} />
              <ExploreCard navigation={navigation} />
              <ExploreCard navigation={navigation} />
              <ExploreCard navigation={navigation} />
            </View>
          </ScrollView>
        </View>

        <View className="px-5 py-3">
          <SectionTitles title={"Weekly Updates!"} />

          <View className="flex-row justify-center flex-wrap mt-5 space-x-5">
            <MasonryList
              key={data}
              data={data}
              numColumns={2}
              keyExtractor={(item) => item.id} // Set the key extractor function
              ListHeaderComponent={<View />}
              renderItem={({ item }) => (
                <View className="m-1">
                  <WeeklyUpdateCard item={item} />
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ClubsScreen;

const RedirectingCards = ({
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
      className={`bg-[${color}] active:bg-[${activeBgColor}] h-40 w-44 rounded-3xl overflow-hidden p-4 m-2`}
      onPress={() => navigation.navigate(redirectTo)}
      style={{
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.21,
        shadowRadius: 8.19,
        elevation: 10,
        // backgroundColor: "#0000",
      }}
    >
      <Text
        className={`text-[${textColor}] text-2xl`}
        style={GlobalStyles.fontBold}
      >
        {title}
      </Text>
      <Text className={`text-[${descColor}]`} style={GlobalStyles.fontSemiBold}>
        {desc}
      </Text>

      {/* <LottieView
        ref={animation}
        autoPlay
        loop
        className="w-32 h-32 absolute right-0 top-0"
        source={require("../assets/Illustrations/ExploreParty.json")}
      /> */}

      {/* <Image source={image} className="w-24 h-24 absolute -bottom-1 right-1" /> */}

      <View className="absolute bottom-2 right-2">{image}</View>
    </Pressable>
  );
};

const ExploreCard = ({ navigation }) => {
  return (
    <View className="bg-[#262626] rounded-2xl w-64 p-3 flex-row space-x-4 mx-2 overflow-hidden">
      <View
        className="overflow-hidden rounded-xl w-20 h-20"
        style={{
          shadowColor: "#fff",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 18,
          // backgroundColor: "#0000",
        }}
      >
        <Image
          source={require("../assets/Images/User/Dummy-Profile.png")}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      <View className="">
        <Text
          className="text-[#f9f9f9] w-32 text-base"
          numberOfLines={1}
          style={GlobalStyles.fontSemiBold}
        >
          Aspirant Club
        </Text>

        {/* Rating  */}
        <View className="flex-row items-center space-x-2 my-2">
          <View className="flex-row items-center space-x-1">
            <Global size="18" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              Public
            </Text>
          </View>

          <Text className="text-gray-400 text-center">•</Text>

          <View className="flex-row items-center">
            <People size="16" color="#FF26B9" variant="Bold" />
            <Text className="text-[#f9f9f9]" style={GlobalStyles.fontMedium}>
              432
            </Text>
          </View>
        </View>
        <Pressable
          className="py-1 border border-[#E9FA00] active:bg-[#101010] rounded-lg"
          onPress={() => navigation.navigate("GlobalDetails", {})}
        >
          <Text className="text-[#f9f9f9] text-center">View Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const WeeklyUpdateCard = ({ item }) => {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (item.image) {
      Image.getSize(item.image, (width, height) => setRatio(width / height));
    }
  }, [item.image]);
  return (
    <ImageBackground
      className="rounded-xl overflow-hidden"
      source={{
        uri: item.image,
      }}
      style={[{ aspectRatio: ratio }]}
    >
      <View className={` ${item.bgColor} absolute h-full w-full`} />
      <View className="h-full w-full flex-col justify-center items-center">
        <Text
          className={` text-[${item.textColor}] text-3xl`}
          style={GlobalStyles.fontBlack}
        >
          {item.title}
        </Text>
      </View>
    </ImageBackground>
  );
};
