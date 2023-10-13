import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Pressable,
  Text,
} from "react-native";
import { SearchNormal1, Add } from "iconsax-react-native";
import { useState } from "react";

const SearchBar = ({
  searchData,
  setSearchData,

  handleSearch,
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <View className="px-5">
      <View
        className={`flex-row justify-between my-5 rounded-xl p-3 border border-[#EADAAA]  ${
          clicked ? "bg-[#EADAAA]" : ""
        }`}
      >
        <View className="flex-row items-center w-72 gap-2">
          {/* search Icon */}
          <SearchNormal1 size={28} color="black" />
          {/* Input field */}
          <TextInput
            placeholder="Find your city"
            value={searchData}
            onChangeText={(text) => {
              setSearchData(text);
              handleSearch(); // Call the search function
            }}
            onFocus={() => {
              setClicked(true);
            }}
            placeholderTextColor={"#262626"}
            className="text-lg w-full"
          />

          {/* {console.log(searchData)} */}
        </View>

        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Add
            size={32}
            color="black"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchData("");
            }}
            className="rotate-45"
          />
        )}
      </View>
    </View>
  );
};
export default SearchBar;
