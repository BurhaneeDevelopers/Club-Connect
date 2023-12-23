import { View, Text, Image, Pressable } from "react-native";
import React, { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useState } from "react";
import {
  Brush,
  Brush2,
  Brush3,
  BrushBig,
  BrushSquare,
  Clock,
  ColorSwatch,
  Colorfilter,
  Icon,
  Information,
  Lock,
  Lock1,
  SearchStatus1,
  Share,
  Trash,
} from "iconsax-react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ICONS
import VerticalMenu from "../assets/icons/VerticalMenu.svg";

const VerticalChatMenu = ({ navigation, user }) => {
  const refRBSheet = useRef();

  const [chatlocktoggle, setChatlocktoggle] = useState("Off");
  useEffect(() => {
    const fetchStoredPin = async () => {
      const storedPin = await AsyncStorage.getItem(`user_pin_${user?.uid}`);
      if (storedPin) {
        setChatlocktoggle("On");
      } else {
        setChatlocktoggle("Off");
      }
    };

    fetchStoredPin();
  }, [user?.id]);

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
        height={330}
      >
        <View className="bg-[#262626] h-full rounded-t-3xl">
          <Pressable
            className="bg-[#E2E3F0] mx-auto top-3 h-1.5 w-12 rounded-full"
            onPress={() => refRBSheet.current.close()}
          ></Pressable>

          <View className="my-auto space-y-2">
            <Pressable className="flex-row justify-between items-center active:bg-[#575757]/40 w-full p-2 px-5">
              <View className="flex-row items-center space-x-1">
                <Clock color={"#FF26B9"} size={24} varian="Outline" />
                <Text className="text-base text-[#f9f9f9]">
                  Set Messages disappear after 24 hours
                </Text>
              </View>

              <Text className="text-gray-300">Off</Text>
            </Pressable>

            <Pressable
              className="flex-row justify-between items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5"
              onPress={() => {
                refRBSheet.current.close();
                navigation.navigate("SetChatLock", { user });
              }}
            >
              <View className="flex-row items-center space-x-1">
                <Lock1 color={"#FF26B9"} size={24} varian="Outline" />
                <Text className="text-base text-[#f9f9f9]"> Lock Chat </Text>
              </View>

              <Text className="text-gray-300">{chatlocktoggle}</Text>
            </Pressable>

            {/* <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <FaceTime width={24} height={24} />
              <Text className="text-base text-[#f9f9f9]"> Video Call </Text>
            </Pressable> */}

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <BrushBig color={"#FF26B9"} size={24} variant="Outline" />
              <Text className="text-base text-[#f9f9f9]"> Themes </Text>
            </Pressable>

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <Share color={"#FF26B9"} size={24} variant="Outline" />
              <Text className="text-base text-[#f9f9f9]"> Share </Text>
            </Pressable>

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <Trash color={"#ff0000"} size={24} variant="Outline" />
              <Text className="text-lg text-[#f9f9f9]">Clear Chat</Text>
            </Pressable>

            <Pressable className="flex-row items-center space-x-1 active:bg-[#575757]/40 w-full p-2 px-5">
              <Information color={"#ff0000"} size={24} variant="Outline" />
              <Text className="text-lg text-[#f9f9f9]"> Report </Text>
            </Pressable>
          </View>
        </View>
      </RBSheet>
      <Pressable
        className="my-auto z-50"
        onPress={() => refRBSheet.current.open()}
      >
        <VerticalMenu width={24} height={24} />
      </Pressable>
    </>
  );
};

export default VerticalChatMenu;
