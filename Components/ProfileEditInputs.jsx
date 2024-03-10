import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const ProfileEditInputs = (props) => {
  // Active State for inputs
  const [activeInput, setActiveInput] = useState();

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const {
    name,
    setName,
    userName,
    setUserName,
    bio,
    setBio,
    location,
    setLocation,
  } = props.states;

  return (
    <View>
      <View className="px-3">
        {/* Name  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm"
            style={GlobalStyles.fontMedium}
          >
            NAME
          </Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={`${
              activeInput === 1 ? "#000000" : "#61677A"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-4 rounded-xl text-[#f9f9f9] text-sm ${
              activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(1)}
            value={name}
            onChangeText={(text) => setName(text)}
            style={GlobalStyles.fontMedium}
          />
        </View>

        {/* UserName  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm"
            style={GlobalStyles.fontMedium}
          >
            USERNAME
          </Text>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor={`${
              activeInput === 2 ? "#000000" : "#61677A"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-4 rounded-xl text-[#f9f9f9] text-sm ${
              activeInput === 2 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(2)}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={GlobalStyles.fontMedium}
          />
        </View>

        {/* Bio  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm"
            style={GlobalStyles.fontMedium}
          >
            BIO
          </Text>
          <TextInput
            placeholder="Enter your bio"
            placeholderTextColor={`${
              activeInput === 3 ? "#000000" : "#61677A"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-4 rounded-xl text-[#f9f9f9] text-sm ${
              activeInput === 3 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(3)}
            value={bio}
            onChangeText={(text) => setBio(text)}
            style={GlobalStyles.fontMedium}
          />
        </View>

        {/* Location  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm"
            style={GlobalStyles.fontMedium}
          >
            LOCATION
          </Text>
          <TextInput
            placeholder="Enter your location"
            placeholderTextColor={`${
              activeInput === 4 ? "#000000" : "#61677A"
            }`}
            className={`border border-[#FF26B9] p-3 py-4 rounded-xl text-[#f9f9f9] w-96 text-sm ${
              activeInput === 4 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(4)}
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={GlobalStyles.fontMedium}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileEditInputs;
