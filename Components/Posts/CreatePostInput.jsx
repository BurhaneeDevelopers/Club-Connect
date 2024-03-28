import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Tags from "react-native-tags";

const CreatePostInput = (props) => {
  // Active State for inputs
  const [activeInput, setActiveInput] = useState();

  const handleInputFocus = (inputNumber) => {
    setActiveInput(inputNumber);
  };

  const handleInputBlur = () => {
    setActiveInput(null);
  };

  const handleInputChange = (text) => {
    // Remove leading and trailing whitespaces
    text = text.trim();
    // Ensure tags start with '#' and separated by commas without any spaces
    if (text !== "" && text.match(/^#[^\s,#]+(,#?#[^\s,#]+)*$/)) {
      const tagsArray = text.split(",").map((tag) => tag.trim());
      setPostTags(tagsArray);
      setTagsError(false);
    } else {
      setTagsError(true);
    }
  };
  
  const {
    postTitle,
    setPostTitle,
    postDescription,
    setPostDescription,
    postTags,
    setPostTags,
    tagsError,
    setTagsError,
  } = props.states;

  return (
    <View>
      <View className="px-3">
        {/* Name  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm uppercase"
            style={GlobalStyles.fontMedium}
          >
            TITLE
          </Text>
          <TextInput
            placeholder="Enter post title"
            placeholderTextColor={`${
              activeInput === 1 ? "#000000" : "#61677A"
            }`}
            className={`border border-[#FF26B9] w-96 p-3 py-4 rounded-xl text-[#f9f9f9] text-sm ${
              activeInput === 1 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(1)}
            value={postTitle}
            onChangeText={(text) => setPostTitle(text)}
            style={GlobalStyles.fontMedium}
          />
        </View>

        {/* UserName  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm uppercase"
            style={GlobalStyles.fontMedium}
          >
            Post DESCRIPTION
          </Text>
          <TextInput
            placeholder="Enter post's Description"
            placeholderTextColor={`${
              activeInput === 2 ? "#000000" : "#61677A"
            }`}
            className={`border border-[#FF26B9] w-96 px-3 pt-4 rounded-xl text-[#f9f9f9] text-sm !flex-row !justify-start !item-start !text-start ${
              activeInput === 2 ? "bg-[#FF26B9] text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(2)}
            value={postDescription}
            onChangeText={(text) => setPostDescription(text)}
            style={[
              GlobalStyles.fontMedium,
              {
                textAlignVertical: "top", // Align text to the top
              },
            ]}
            editable
            multiline
            numberOfLines={10}
          />
        </View>

        {/* TAGS  */}
        <View className="my-1">
          <Text
            className="text-[#f9f9f9] font-bold py-2 px-1 text-sm uppercase"
            style={GlobalStyles.fontMedium}
          >
            TAGS
          </Text>
          <Tags
            // initialText="monkey"
            textInputProps={{
              placeholder: "Enter Any Tags related to Post",
              placeholderTextColor: `${
                activeInput === 3 ? "#000000" : "#61677A"
              }`,
            }}
            // initialTags={["dog", "cat", "chicken"]}
            onChangeTags={(tags) => setPostTags(tags)}
            // onTagPress={(index, tagLabel, event, deleted) =>
            //   console.log(
            //     index,
            //     tagLabel,
            //     event,
            //     deleted ? "deleted" : "not deleted"
            //   )
            // }
            className={`border border-[#FF26B9] w-full p-3 py-4 rounded-xl text-[#f9f9f9] text-sm ${
              activeInput === 3 ? "text-[#f9f9f9]" : null
            }`}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(3)}
            style={GlobalStyles.fontMedium}
            // containerStyle={{ justifyContent: "center" }}
            inputStyle={{ backgroundColor: "#000", color: "white" }}
            renderTag={({ tag, index, onPress, deleteTagOnPress }) => (
              <Pressable
                key={`${tag}-${index}`}
                onPress={() => {
                  onPress();
                  deleteTagOnPress();
                }}
                className="bg-[#262626] mt-3 ml-1 p-2 px-4 rounded-lg"
              >
                <Text className="text-white">{tag}</Text>
              </Pressable>
            )}
          />
          <Text
            className="text-xs mt-2 ml-1 text-gray-200"
            style={GlobalStyles.fontMedium}
          >
            Enter comma(,) seperated tags following hash (#){" "}
          </Text>

          {tagsError ? (
            <Text
              className="text-[#ff0000] text-xs"
              style={GlobalStyles.fontMedium}
            >
              Tags should start with "#" and be separated by commas without any
              spaces.
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CreatePostInput;
