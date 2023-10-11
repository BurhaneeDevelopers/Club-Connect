import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
// import { SearchBar } from "@rneui/themed";
import SearchBar from "../Components/SearchBar";
import { useState, useEffect } from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import HR from "../Components/HR";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PAGE_SIZE = 10;

const CitiesListScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleData, setVisibleData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [clicked, setClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadInitialData = async () => {
    // Load the data from local storage
    try {
      const cachedData = await AsyncStorage.getItem("cachedData");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setData(parsedData);
        loadMoreData(parsedData, currentPage);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error loading data from local storage:", error);
      setIsLoading(false);
    }
  };

  function loadMoreData(data, page) {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    const nextData = data.slice(startIndex, endIndex);
    setVisibleData((prevData) => [...prevData, ...nextData]);
  }

  function handleLoadMore() {
    const nextPage = currentPage + 1;
    loadMoreData(data, nextPage);
    setCurrentPage(nextPage);
  }

  function filterData(data, searchText) {
    return data.filter((countryData) => {
      const countryMatch = countryData.country
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const cityMatch = countryData.cities.some((city) =>
        city.toLowerCase().includes(searchText.toLowerCase())
      );
      return countryMatch || cityMatch;
    });
  }

  function handleSearch() {
    if (searchData.trim() === "") {
      // If the search input is empty, show the original data
      setVisibleData(data.slice(0, PAGE_SIZE));
    } else {
      const filteredData = filterData(data, searchData);
      setVisibleData(filteredData.slice(0, PAGE_SIZE));
    }
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      handleLoadMore();
    }
  };

  return (
    <View>
      <SearchBar
        searchData={searchData}
        setSearchData={setSearchData}
        clicked={clicked}
        setClicked={setClicked}
        handleSearch={handleSearch}
      />

      <ScrollView onScroll={handleScroll}>
        {isLoading ? (
          <View className="my-5">
            <ActivityIndicator size="32" color="#EADAAA" />
            {/* <Text
              className="text-center text-xl"
              style={GlobalStyles.fontMedium}
            >
              Loading Data...
            </Text> */}
          </View>
        ) : (
          visibleData.map((countryData, index) => {
            return (
              <View key={index} className="px-5 mt-7">
                <Text className="text-white" style={GlobalStyles.fontSemiBold}>
                  {countryData.country}
                </Text>
                {countryData.cities.map((city, cityIndex) => (
                  <View key={cityIndex}>
                    <View className="my-2.5">
                      <HR />
                    </View>
                    <Text style={GlobalStyles.fontMedium} className="text-lg">
                      {city}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })
        )}

        {!isLoading && (
          <Pressable
            onPress={handleLoadMore} // Disable the button when showError is true
            className="w-full bg-[#272727] active:bg-[#393939] p-3 rounded-lg items-center absolute bottom-10"
          >
            <Text
              className="text-[#f9f9f9] text-lg"
              style={GlobalStyles.fontMedium}
            >
              Load More
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default CitiesListScreen;
