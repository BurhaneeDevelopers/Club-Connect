import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Book,
  Camera,
  Lock1,
  Map,
  Messages,
  Microscope,
  People,
} from "iconsax-react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import "firebase/database";
import * as ImagePicker from "expo-image-picker";
import illustration from "../assets/Illustrations/amico.png";

// Components
import SectionTitles from "../Components/SectionTitles";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";
import { app, db, getAuth } from "../firebase";
import FollowButton from "../Components/FollowButton";
import userGlobalUsers from "../Hooks/useGlobalUsers";

const CommunityScreen = ({ navigation }) => {
  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  // data = [
  //   {
  //     id: "1",
  //     image:
  //       "https://images.pexels.com/photos/1334605/pexels-photo-1334605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Vibecity",
  //     bgColor: "bg-[#E9FA00]/40",
  //     textColor: "#101010",
  //   },
  //   {
  //     id: "2",
  //     image:
  //       "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Top Clubs",
  //     bgColor: "bg-[#FF26B9]/50",
  //     textColor: "#f9f9f9",
  //   },
  //   {
  //     id: "3",
  //     image:
  //       "https://images.pexels.com/photos/63507/pexels-photo-63507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     title: "Best Cafe",
  //     bgColor: "bg-[#FF26B9]/50",
  //     textColor: "#f9f9f9",
  //   },
  //   {
  //     id: "4",
  //     image:
  //       "https://images.pexels.com/photos/2385210/pexels-photo-2385210.jpeg",
  //     title: "Top Rated",
  //     bgColor: "bg-[#E9FA00]/40",
  //     textColor: "#101010",
  //   },
  // ];

  // const { users, fetchUsers } = userGlobalUsers();

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const auth = getAuth();

  return (
    <SafeAreaView className="h-screen justify-center items-center space-y-5">
        <View className="bg-[#E9FA00] py-5 px-5 rounded-3xl flex-column justify-center items-center">
          <Text
            className="text-4xl text-[#101010] py-2 "
            style={GlobalStyles.fontBold}
          >
            Coming Soon !
          </Text>
          <Text className="px-2 pb-3 text-base text-[#464646]" style={GlobalStyles.fontmedium}>
            This screen is currently under construction.
          </Text>
          <View className="pb-3 pt-3">
          <Image source={illustration} className="w-80 h-72 " />
        </View>
        </View>
        
        <View>
          <Pressable
            className="bg-[#FF26B9] rounded-lg px-3 py-3 flex justify-center items-center"
            onPress={() => navigation.goBack()}
          >
            <Text
              className="text-xl px-4 text-[#f9f9f9]"
              style={GlobalStyles.fontSemiBold}
            >
              Return to Events
            </Text>
          </Pressable>
        </View>

    </SafeAreaView>
  );








    // <SafeAreaView className="h-full w-full">
    //   {/* {image && (
    //       <Image
    //         source={{ uri: image }}
    //         style={{ width: 200, height: 200 }}
    //         className="rounded-3xl mx-auto"
    //       />
    //     )} */}
    //   <FloatingCameraButton pickImage={pickImage} />

    //   <ScrollView>
    //     <View className="">
    //       <View className="flex-row w-full justify-between items-center p-5">
    //         <Pressable
    //           onPress={() => navigation.goBack()}
    //           className="absolute ml-5"
    //         >
    //           <ArrowLeft size="32" color="#f9f9f9" />
    //         </Pressable>

    //         <Text
    //           className="text-xl text-[#E9FA00] mx-auto max-w-[192px]"
    //           style={GlobalStyles.fontSemiBold}
    //           numberOfLines={1}
    //         >
    //           Community
    //         </Text>

    //         {/* Button to Save Cafe */}
    //         <Pressable
    //           className="bg-[#E9FA00] active:bg-[#f7ff8c] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5"
    //           onPress={() => navigation.navigate("MessageList")}
    //         >
    //           <Messages size="24" color={"#101010"} variant={"Outline"} />
    //         </Pressable>
    //       </View>

    //       <View className="flex-row justify-around items-center px-5 pt-5 pb-2">
    //         <FilterPageComponent
    //           title={"Posts"}
    //           icon={<Book size="28" color={"#FF26B9"} variant={"Outline"} />}
    //           navigation={navigation}
    //           redirectTo={""}
    //         />
    //         <FilterPageComponent
    //           title={"Explore"}
    //           icon={
    //             <Microscope size="28" color={"#FF26B9"} variant={"Outline"} />
    //           }
    //           navigation={navigation}
    //           redirectTo={""}
    //         />
    //         <FilterPageComponent
    //           title={"Maps"}
    //           icon={<Map size="28" color={"#FF26B9"} variant={"Outline"} />}
    //           navigation={navigation}
    //           redirectTo={""}
    //         />
    //         <FilterPageComponent
    //           title={"Clubs"}
    //           icon={<People size="28" color={"#FF26B9"} variant={"Outline"} />}
    //           navigation={navigation}
    //           redirectTo={"Clubs"}
    //         />
    //       </View>
    //     </View>

    //     {/* Recent Interactions  */}
    //     <View className="p-5">
    //       <SectionTitles title={"Recent Interactions"} />

    //       <ScrollView
    //         horizontal={true}
    //         showsHorizontalScrollIndicator={false}
    //         alwaysBounceHorizontal={true}
    //       >
    //         <View className="flex-row mt-5">
    //           {/* {users.map((user) => {
    //             return (
    //               <>
    //                 {auth.currentUser.uid == user.uid ? (
    //                   ""
    //                 ) : (
    //                   <RecentInteractionCards
    //                     key={user?.uid}
    //                     userData={{
    //                       user: user,
    //                       navigation: navigation,
    //                       auth: auth,
    //                     }}
    //                   />
    //                 )}
    //               </>
    //             );
    //           })} */}
    //           {users.map((user) => {
    //             return (
    //               <RecentInteractionCards
    //                 key={user?.uid}
    //                 userData={{
    //                   user: user,
    //                   navigation: navigation,
    //                   auth: auth,
    //                 }}
    //               />
    //             );
    //           })}
    //         </View>
    //       </ScrollView>
    //     </View>

    //     <View className="p-5">
    //       <SectionTitles title={"Weekly Updates!"} />

    //       <View className="flex-row justify-center flex-wrap mt-5 space-x-5">
    //         <MasonryList
    //           key={data}
    //           data={data}
    //           numColumns={2}
    //           keyExtractor={(item) => item.id} // Set the key extractor function
    //           ListHeaderComponent={<View />}
    //           renderItem={({ item }) => (
    //             <View className="m-1">
    //               <WeeklyUpdateCard item={item} />
    //             </View>
    //           )}
    //         />
    //       </View>
    //     </View>

    //     {/* Top Clubs For You!  */}
    //     <View className="p-5">
    //       <SectionTitles title={"Top Clubs For You!"} />

    //       <ScrollView
    //         horizontal={true}
    //         showsHorizontalScrollIndicator={false}
    //         alwaysBounceHorizontal={true}
    //       >
    //         <View className="flex-row mt-5">
    //           <TopClubCards title={"Aspirant Club"} />
    //           <TopClubCards title={"NightStudy"} />
    //           <TopClubCards title={"Mohammed"} />
    //           <TopClubCards title={"Suresh"} />
    //           <TopClubCards title={"Suresh"} />
    //           <TopClubCards title={"Suresh"} />
    //           <TopClubCards title={"Bobby"} />
    //         </View>
    //       </ScrollView>
    //     </View>

    //     {/* Recent Interactions  */}
    //     <View className="p-5">
    //       <SectionTitles title={"Explore other Vibers"} />

    //       <ScrollView
    //         horizontal={true}
    //         showsHorizontalScrollIndicator={false}
    //         alwaysBounceHorizontal={true}
    //       >
    //         <View className="flex-row mt-5">
    //           {users.map((user, index) => {
    //             return (
    //               <ExploreOtherVibersCard
    //                 key={index}
    //                 userData={{
    //                   user: user,
    //                   navigation: navigation,
    //                 }}
    //               />
    //             );
    //           })}
    //         </View>
    //       </ScrollView>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

};

export default CommunityScreen;

// const FloatingCameraButton = ({ pickImage }) => {
//   return (
//     <Pressable
//       className="flex-row items-center justify-center bg-[#FF26B9] active:bg-[#bb3691] rounded-full w-16 h-16 absolute right-10 bottom-10 z-50"
//       onPress={() => {
//         pickImage();
//         console.log("clicked");
//       }}
//     >
//       <Camera color="#fff" variant="Outline" size="32" />
//     </Pressable>
//   );
// };

// const FilterPageComponent = ({ title, icon, navigation, redirectTo }) => {
//   return (
//     <Pressable
//       className="flex-col justify-center items-center space-y-1"
//       onPress={() => navigation.navigate(redirectTo)}
//     >
//       {icon}
//       <Text className="text-[#f9f9f9] text-lg">{title}</Text>
//     </Pressable>
//   );
// };

// const RecentInteractionCards = (props) => {
//   const { user, navigation, auth } = props?.userData || {};
//   return (
//     <Pressable
//       className="flex-col items-center justify-center space-y-1 mr-6 bg-[#262626] p-3 py-5 rounded-xl min-w-[180px] max-w-[180px]"
//       onPress={() =>
//         navigation.navigate("GlobalProfile", {
//           user,
//         })
//       }
//     >
//       {user?.profileImage ? (
//         <Image
//           source={{ uri: user?.profileImage }}
//           className="w-16 h-16 rounded-full"
//         />
//       ) : (
//         <Image
//           source={require("../assets/Images/User/Dummy-Profile.png")}
//           className="w-16 h-16 rounded-full"
//         />
//       )}

//       <View>
//         <Text
//           className="text-lg text-white mx-auto"
//           numberOfLines={1}
//           style={GlobalStyles.fontMedium}
//         >
//           @{user?.userName}
//         </Text>
//         <Text
//           className="text-sm text-gray-200 mx-auto"
//           numberOfLines={1}
//           style={GlobalStyles.fontMedium}
//         >
//           {user?.name}
//         </Text>

//         <FollowButton otherUserId={user?.uid} auth={auth} name={user?.name} />
//       </View>
//     </Pressable>
//   );
// };

// const ExploreOtherVibersCard = (props) => {
//   const { user, navigation } = props?.userData || {};
//   return (
//     <Pressable
//       className="flex-col items-center justify-center space-y-1 mr-6 bg-[#262626] p-3 py-5 rounded-xl min-w-[180px] max-w-[180px]"
//       onPress={() => navigation.navigate("GlobalProfile", { user })}
//     >
//       {user?.profileImage ? (
//         <Image
//           source={{ uri: user?.profileImage }}
//           className="w-16 h-16 rounded-full"
//         />
//       ) : (
//         <Image
//           source={require("../assets/Images/User/Dummy-Profile.png")}
//           className="w-16 h-16 rounded-full"
//         />
//       )}

//       <Text
//         className="text-lg text-white mx-auto"
//         numberOfLines={1}
//         style={GlobalStyles.fontMedium}
//       >
//         @{user?.userName}
//       </Text>
//       <Text
//         className="text-sm text-gray-200 mx-auto"
//         numberOfLines={1}
//         style={GlobalStyles.fontMedium}
//       >
//         {user?.name}
//       </Text>

//       <View className="bg-[#E9FA00] px-3 py-2 rounded-lg mt-3 w-full">
//         <Text className="text-center" style={GlobalStyles.fontSemiBold}>
//           Follow
//         </Text>
//       </View>
//     </Pressable>
//   );
// };

// const TopClubCards = ({ title, image }) => {
//   return (
//     <ImageBackground
//       source={require("../assets/Images/User/Dummy-Profile.png")}
//       className="flex-col items-center justify-end h-44 space-y-1 mr-6 rounded-3xl overflow-hidden"
//     >
//       <View className={` bg-black/60 absolute h-full w-full`} />

//       <View className="p-3 flex-col space-y-2 justify-center items-center">
//         <View>
//           <Image
//             source={require("../assets/Images/Santorini.jpg")}
//             className="w-14 h-14 rounded-full"
//           />
//         </View>

//         <Text
//           className="text-xl text-[#f9f9f9] mx-auto max-w-[100px]"
//           numberOfLines={1}
//           style={GlobalStyles.fontSemiBold}
//         >
//           {title}
//         </Text>

//         <View className="flex-row items-center justify-center">
//           <Image
//             source={require("../assets/Images/User/Dummy-Profile.png")}
//             className="w-4 h-4 rounded-full"
//           />
//           <Image
//             source={require("../assets/Images/User/Dummy-Profile.png")}
//             className="w-4 h-4 rounded-full -ml-2"
//           />
//           <Image
//             source={require("../assets/Images/User/Dummy-Profile.png")}
//             className="w-4 h-4 rounded-full -ml-2"
//           />

//           <Text className="ml-1 text-[#f9f9f9]">+3</Text>
//         </View>

//         <Pressable className="bg-[#FF26B9] px-5 py-1.5 rounded-lg">
//           <Text
//             className="text-white text-base"
//             style={GlobalStyles.fontMedium}
//           >
//             View Club
//           </Text>
//         </Pressable>
//       </View>
//     </ImageBackground>
//   );
// };

// const WeeklyUpdateCard = ({ item }) => {
//   const [ratio, setRatio] = useState(1);

//   useEffect(() => {
//     if (item.image) {
//       Image.getSize(item.image, (width, height) => setRatio(width / height));
//     }
//   }, [item.image]);
//   return (
//     <ImageBackground
//       className="rounded-xl overflow-hidden"
//       source={{
//         uri: item.image,
//       }}
//       style={[{ aspectRatio: ratio }]}
//     >
//       <View className={` ${item.bgColor} absolute h-full w-full`} />
//       <View className="h-full w-full flex-col justify-center items-center">
//         <Text
//           className={` text-[${item.textColor}] text-3xl`}
//           style={GlobalStyles.fontBlack}
//         >
//           {item.title}
//         </Text>
//       </View>
//     </ImageBackground>
//   );
// };
