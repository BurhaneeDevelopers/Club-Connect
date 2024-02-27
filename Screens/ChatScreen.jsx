import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Pressable,
} from "react-native";
import {
  AddSquare,
  ArrowLeft,
  Call,
  CallOutgoing,
  SearchStatus1,
  Send2,
  TickCircle,
  Video,
} from "iconsax-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../Styles/GlobalStyles";
import { useRoute } from "@react-navigation/native";
import VerticalChatMenu from "../Components/VerticalChatMenu";

export default function ChatScreen({ navigation }) {
  const {
    params: { user },
  } = useRoute();

  const [currentUser] = useState({
    name: "John Doe",
  });

  const [messages, setMessages] = useState([
    { sender: "John Doe", message: "Hey there!", time: "6:01 PM" },
    {
      sender: "Robert Henry",
      message: "Hello, how are you doing?",
      time: "6:02 PM",
    },
    {
      sender: "John Doe",
      message: "I am good, how about you?",
      time: "6:02 PM",
    },
    {
      sender: "John Doe",
      message: `😊😇`,
      time: "6:02 PM",
    },
    {
      sender: "Robert Henry",
      message: `Can't wait to meet you.`,
      time: "6:03 PM",
    },
    {
      sender: "John Doe",
      message: `That's great, when are you coming?`,
      time: "6:03 PM",
    },
    {
      sender: "Robert Henry",
      message: `This weekend.`,
      time: "6:03 PM",
    },
    {
      sender: "Robert Henry",
      message: `Around 4 to 6 PM.`,
      time: "6:04 PM",
    },
    {
      sender: "John Doe",
      message: `Great, don't forget to bring me some mangoes.`,
      time: "6:05 PM",
    },
    {
      sender: "Robert Henry",
      message: `Sure!`,
      time: "6:05 PM",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  function getTime(date) {
    const hours = date.getHours() % 12 || 12;
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  }

  function sendMessage() {
    if (!inputMessage.trim()) {
      setInputMessage("");
      return;
    }

    const time = getTime(new Date());
    const newMessage = {
      sender: currentUser.name,
      message: inputMessage,
      time: time,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
  }

  const containerRef = useRef(null);
  const updateBorderRadius = () => {
    if (containerRef.current) {
      containerRef.current.measureInWindow((x, y, width, height) => {
        const newBorderRadius = Math.min(height / 2, 30); // Minimum borderRadius: 20, Maximum: height/2
        containerRef.current.setNativeProps({
          style: { borderRadius: newBorderRadius },
        });
      });
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-row w-full justify-between items-center px-2 py-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="flex-row items-start"
        >
          <ArrowLeft size="30" color="#f9f9f9" />
          <Text
            className="text-lg ml-3 text-[#E9FA00] max-w-[192px]"
            style={GlobalStyles.fontSemiBold}
            numberOfLines={1}
          >
            {user?.userName}
          </Text>
        </Pressable>

        {/* Button to Save Cafe */}
        <View className="flex-row items-center space-x-4">
          <Call size={25} color="#FF26B9" variant="Outline" />
          <Video size={25} color="#FF26B9" variant="Outline" />
          <View className="bg-[#E9FA00] p-1 rounded-lg">
            <VerticalChatMenu navigation={navigation} user={user} />
          </View>
        </View>
      </View>

      <View className="flex-1">
        <FlatList
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View className="mt-3 px-5">
                <View
                  className={`${
                    item.sender === currentUser.name
                      ? "self-end"
                      : "self-start flex-row items-end space-x-2"
                  }`}
                >
                  {item.sender !== currentUser.name && (
                    <Image
                      source={require("../assets/Images/User/Dummy-Profile.png")}
                      className="w-7 h-7 rounded-xl"
                    />
                  )}

                  <View>
                    <View
                      style={{
                        maxWidth: Dimensions.get("screen").width * 0.8,
                      }}
                      className={` p-3 px-5 rounded-2xl ${
                        item.sender === currentUser.name
                          ? "bg-[#E9FA00] rounded-br-none self-end"
                          : "bg-[#FF26B9] rounded-bl-none self-start"
                      }`}
                    >
                      <Text
                        className={`text-base ${
                          item.sender === currentUser.name
                            ? "text-[#000000]"
                            : "text-white"
                        }`}
                        style={GlobalStyles.fontSemiBold}
                      >
                        {item.message}
                      </Text>
                    </View>

                    <Text
                      className={`text-white text-[10px] mt-0.5 ${
                        item.sender === currentUser.name
                          ? "self-end"
                          : "self-start"
                      }`}
                      style={GlobalStyles.fontSemiBold}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View className="p-3 py-5">
          <View
            ref={containerRef}
            className="bg-[#262626] p-2.5 px-5 flex-row items-center justify-between border border-gray-500"
            style={{ maxHeight: 90, borderRadius: 30 }}
          >
            <TextInput
              defaultValue={inputMessage}
              className="text-base text-[#f9f9f9] w-[280px]"
              placeholderTextColor="#f9f9f9"
              placeholder="Message"
              onChangeText={(text) => {
                setInputMessage(text);
                updateBorderRadius();
              }}
              onSubmitEditing={() => {
                sendMessage();
              }}
              style={{ maxWidth: 290, ...GlobalStyles.fontSemiBold }}
              multiline
              onContentSizeChange={updateBorderRadius}
            />
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => {
                  sendMessage();
                }}
              >
                <AddSquare size={24} color="#FF26B9" variant="Outline" />
              </TouchableOpacity>
              <TouchableOpacity
                // className="ml-2"
                onPress={() => {
                  sendMessage();
                }}
              >
                <Send2 size={24} color="#FF26B9" variant="Bold" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
