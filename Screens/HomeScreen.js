import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SearchNormal1,
  Buildings2,
  Coffee,
  Building,
  Shop,
  Location,
} from "iconsax-react-native";

// Components
import SectionTitles from "../Components/SectionTitles";

// FONTS
import GlobalStyles from "../Styles/GlobalStyles";

const HomeScreen = ({ navigation }) => {
  // Refresh API when user reloads
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.replace("Index");
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="bg-[#867665] "
    >
      <SafeAreaView className="h-full w-full">
        <View className="flex-row justify-between items-center p-5">
          <View className="flex-row items-center gap-2">
            <Image
              source={require("../assets/Illustrations/Avatar.jpg")}
              className="w-16 rounded-full h-16"
            />

            <View className="">
              <Text
                className="text-white text-xl"
                style={GlobalStyles.fontSemiBold}
              >
                Mohammed Jhansi
              </Text>
              <Text className="text-[#272727]" style={GlobalStyles.fontMedium}>
                Mohammed_jhansi72
              </Text>
            </View>
          </View>

          <View>
            <SearchNormal1 size="32" color="#272727" variant="Broken" />
          </View>
        </View>

        <ScrollView
          horizontal={true}
          className="my-10"
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row pl-5">
            <MenuCards
              icon={<Buildings2 size="32" color="#272727" variant="Broken" />}
              title="Hotspot"
            />
            <MenuCards
              icon={<Coffee size="32" color="#272727" variant="Broken" />}
              title="Cafe"
            />
            <MenuCards
              icon={<Building size="32" color="#272727" variant="Broken" />}
              title="Bars"
            />
            <MenuCards
              icon={<Shop size="32" color="#272727" variant="Broken" />}
              title="Pubs"
            />
            <MenuCards
              icon={<Location size="32" color="#272727" variant="Broken" />}
              title="Map"
            />
          </View>
        </ScrollView>

        <View className="px-5">
          <SectionTitles title="Hot Deals" />

          <ImageBackground
            source={require("../assets/Illustrations/Avatar.jpg")}
            className="h-36 rounded-3xl my-4 overflow-hidden"
          ></ImageBackground>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const MenuCards = ({ icon, title }) => {
  return (
    <>
      <View className="bg-[#EADAAA] rounded-3xl w-24 h-24 justify-center items-center flex-col mx-2">
        {icon}
        <Text style={GlobalStyles.fontRegular}>{title}</Text>
      </View>
    </>
  );
};

const HotspotCard = () => {
  return (
    <>
      <View></View>
    </>
  );
};
