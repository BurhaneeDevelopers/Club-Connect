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
      <View className="px-5">
        {/* Name  */}
        <View className="my-2">
          <Text
            className="text-[#f9f9f9] text-xl p-1"
            style={GlobalStyles.fontMedium}
          >
            Name:
          </Text>
          <TextInput
            placeholder="Enter Your Name..."
            placeholderTextColor={`${
              activeInput === 1 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
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
        <View className="my-2">
          <Text
            className="text-[#f9f9f9] text-xl p-1"
            style={GlobalStyles.fontMedium}
          >
            UserName:
          </Text>
          <TextInput
            placeholder="Enter Your UserName..."
            placeholderTextColor={`${
              activeInput === 2 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
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
        <View className="my-2">
          <Text
            className="text-[#f9f9f9] text-xl p-1"
            style={GlobalStyles.fontMedium}
          >
            Bio:
          </Text>
          <TextInput
            placeholder="Enter Your Bio..."
            placeholderTextColor={`${
              activeInput === 3 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
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
        <View className="my-2">
          <Text
            className="text-[#f9f9f9] text-xl p-1"
            style={GlobalStyles.fontMedium}
          >
            Location:
          </Text>
          <TextInput
            placeholder="Enter Your Location..."
            placeholderTextColor={`${
              activeInput === 4 ? "#101010" : "#f9f9f9"
            }`}
            className={`border border-[#FF26B9] w-full p-3 py-3 rounded-xl text-[#f9f9f9] text-lg ${
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
