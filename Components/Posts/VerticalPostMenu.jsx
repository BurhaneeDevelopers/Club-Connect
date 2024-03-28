import { View, Text, Image, Pressable } from "react-native";
import React, { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import { Information, Share, Trash } from "iconsax-react-native";

// ICONS
import VerticalDots from "../../assets/icons/VerticalDots.svg";

const VerticalPostMenu = ({ navigation, post }) => {
  const refRBSheet = useRef();

  return (
    <>
      <RBSheet
        customStyles={{
          draggableIcon: { display: "none" },
          container: {
            backgroundColor: "transparent",
          },
        }}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={140}
      >
        <View className="bg-[#262626] h-full rounded-t-3xl">
          <Pressable
            className="bg-[#E2E3F0] mx-auto top-3 h-1.5 w-12 rounded-full"
            onPress={() => refRBSheet.current.close()}
          ></Pressable>

          <View className="my-auto space-y-2">
            {/* <Pressable className="flex-row justify-between items-center active:bg-[#575757]/40 w-full p-2 px-5">
              <View className="flex-row items-center space-x-1">
                <Clock color={"#FF26B9"} size={24} varian="Outline" />
                <Text className="text-base text-[#f9f9f9]">
                  Set Messages disappear after 24 hours
                </Text>
              </View>

              <Text className="text-gray-300">Off</Text>
            </Pressable> */}

            {/* <Pressable
              className="flex-row justify-between items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5"
              onPress={() => {
                refRBSheet.current.close();
              }}
            >
              <View className="flex-row items-center space-x-1">
                <Lock1 color={"#FF26B9"} size={24} varian="Outline" />
                <Text className="text-base text-[#f9f9f9]"> Delete </Text>
              </View>
            </Pressable> */}

            {/* <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <FaceTime width={24} height={24} />
              <Text className="text-base text-[#f9f9f9]"> Video Call </Text>
            </Pressable> */}

            {/* <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <BrushBig color={"#FF26B9"} size={24} variant="Outline" />
              <Text className="text-base text-[#f9f9f9]"> Themes </Text>
            </Pressable>

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <Share color={"#FF26B9"} size={24} variant="Outline" />
              <Text className="text-base text-[#f9f9f9]"> Share </Text>
            </Pressable> */}

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <Share color={"#f9f9f9"} size={24} variant="Outline" />
              <Text className="text-sm text-[#f9f9f9]">Share Post</Text>
            </Pressable>

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <Trash color={"#ff0000"} size={24} variant="Outline" />
              <Text className="text-sm text-[#f9f9f9]"> Delete </Text>
            </Pressable>
          </View>
        </View>
      </RBSheet>

      <Pressable
        className="my-auto z-50"
        onPress={() => refRBSheet.current.open()}
      >
        <VerticalDots width={24} height={24} className="" fill="white" />
      </Pressable>
    </>
  );
};

export default VerticalPostMenu;
