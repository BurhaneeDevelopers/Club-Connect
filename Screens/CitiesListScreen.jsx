import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HR from "../Components/HR";
import SearchBar from "../Components/SearchBar";
import CitiesList from "../CitiesList.json";
 
// ICONS
import { ArrowLeft } from "iconsax-react-native";
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";
import { SafeAreaView } from "react-native-safe-area-context";

const CitiesListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [citiesData, setCitiesData] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const data = CitiesList.data;

  useEffect(() => {
    // Retrieve the data from local storage
    const fetchDataFromLocalStorage = async () => {
      setIsLoading(true);
      try {
        if (data) {
          setCitiesData(data);
        }
      } catch (error) {
        console.error("Error retrieving data from local storage:", error);
      } finally {
        // Set isLoading to false after trying to fetch data
        setIsLoading(false);
      }
    };

    fetchDataFromLocalStorage();
  }, []);

  // console.log(citiesData);

  // Inside the CitiesListScreen component
  useEffect(() => {
    if (searchData === "") {
      // If the search input is empty, reset the data to the original data
      setCitiesData([...CitiesList.data]);
      setIsSearching(false);
    }
  }, [searchData]);

  const handleSearch = () => {
    if (searchData) {
      const trimmedSearch = searchData.trim(); // Remove leading and trailing spaces
      const filteredCities = CitiesList.data.filter((city) =>
        city.toLowerCase().includes(trimmedSearch.toLowerCase())
      );

      if (filteredCities.length === 0) {
        // No cities found for the search query
        setCitiesData([]);
        setIsSearching(true);
      } else {
        // Cities found, update the data
        setCitiesData(filteredCities);
        setIsSearching(true);
      }
    }
  };

  const handleCitySelect = (selectedCity) => {
    // Save the selected city to local storage
    AsyncStorage.setItem("selectedCity", selectedCity);

    // Navigate to the next screen or perform other actions as needed
    navigation.navigate("Authenticate", { city: selectedCity });
  };

  return (
    <SafeAreaView>
      <View className="flex-row justify-between w-full items-center mt-5 px-5">
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#f9f9f9" />
        </Pressable>
        <AuthSparklePink width={64} height={64} />
      </View>
      <SearchBar
        searchData={searchData}
        setSearchData={setSearchData}
        handleSearch={handleSearch}
      />

      {isLoading ? (
        <View className="my-5">
          <ActivityIndicator size="32" color="#FF26B9" />
          {/* <Text
              className="text-center text-xl"
              style={GlobalStyles.fontMedium}
            >
              Loading Data... 
            </Text> */}
        </View>
      ) : (
        <ScrollView className="">
          <View className="p-5 pb-48">
            <Text
              style={GlobalStyles.fontSemiBold}
              className="text-[#f9f9f9] text-xl mb-1"
            >
              India
            </Text>

            {citiesData.length === 0 && (
              <Text
                className="text-[#f9f9f9] text-base my-3"
                style={GlobalStyles.fontMedium}
              >
                No cities found for "{searchData}"
              </Text>
            )}
            {citiesData.map((city, index) => {
              return (
                <View key={index}>
                  <View className="my-0.5">
                    <HR customClass={"bg-gray-600"} />
                  </View>
                  <Pressable
                    className="py-4 rounded active:text-[#FF26B9]/70 active:bg-[#575757]/40"
                    onPress={() => {
                      handleCitySelect(city);
                      console.log(city);
                    }}
                  >
                    <Text
                      style={GlobalStyles.fontMedium}
                      className="text-lg text-[#FF26B9] active:text-[#FF26B9]/70"
                    >
                      {city}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
      {/* <FlatList
        data={citiesData} // Use filtered data when searching, or the original data when not searching
        className="p-5 bg-[#000000] rounded-t-3xl"
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            <View className="my-0.5">
              <HR />
            </View>
            <Pressable
              className="py-2 rounded active:text-[#FF26B9]/70"
              onPress={() => navigation.navigate("Index")}
            >
              <Text
                style={GlobalStyles.fontMedium}
                className="text-lg text-[#FF26B9] active:text-[#FF26B9]/70"
              >
                {item}
                {console.log(item)}
              </Text>
            </Pressable>
          </>
        )}
        ListHeaderComponent={() => (
          <>
            <Text
              style={GlobalStyles.fontSemiBold}
              className="text-[#f9f9f9] text-xl mb-1"
            >
              India
            </Text>

            {citiesData.length === 0 && (
              <Text
                className="text-[#f9f9f9] text-base my-3"
                style={GlobalStyles.fontMedium}
              >
                No cities found for "{searchData}"
              </Text>
            )}
          </>
        )}
      /> */}
    </SafeAreaView>
  );
};

export default CitiesListScreen;
