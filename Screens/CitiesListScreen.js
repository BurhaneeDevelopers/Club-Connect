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
import useFetch from "../hook/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS
import { ArrowLeft } from "iconsax-react-native";
import AuthSparklePink from "../assets/Illustrations/AuthSparklePink.svg";

const CitiesListScreen = ({ navigation }) => {
  const { data, error, refetch } = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [citiesData, setCitiesData] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const loadMoreData = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // Retrieve the data from local storage
    const fetchDataFromLocalStorage = async () => {
      try {
        const cachedData = await AsyncStorage.getItem("cachedData");
        if (cachedData) {
          setCitiesData(JSON.parse(cachedData));
          setIsLoading(false);
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

  // Inside the CitiesListScreen component
  useEffect(() => {
    if (searchData === "") {
      // If the search input is empty, reset the data to the original data
      setCitiesData([...data]);
      setIsSearching(false);
    }
  }, [searchData, data]);

  const handleSearch = () => {
    if (searchData) {
      const trimmedSearch = searchData.trim(); // Remove leading and trailing spaces
      const filteredCities = citiesData.filter((city) =>
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
      ) : null}
      <FlatList
        data={isSearching ? citiesData : data} // Use filtered data when searching, or the original data when not searching
        className="p-5 bg-[#101010] rounded-t-3xl h-full"
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
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
      />
    </SafeAreaView>
  );
};

export default CitiesListScreen;
