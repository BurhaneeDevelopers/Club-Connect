import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken, body) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Vibehotspot",
    body: body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#101010",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function usePushNotification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      let token;

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;

        setExpoPushToken(token);
        console.log("EXPO PUSH TOKEN IS ", expoPushToken)
      } else {
        alert("Must use physical device for Push Notifications");
      }
    };

    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  const handleNotification = (notification) => {
    // Handle incoming notifications as needed
    console.log(notification);
  };

  const sendPushNotification = async (targetExpoPushToken, body) => {
    const message = {
      to: targetExpoPushToken,
      sound: "default",
      title: "Vibehotspot",
      body: body,
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const sendFollowNotification = async (targetExpoPushToken, followerName) => {
    const body = `${followerName} has started following you!`;
    await sendPushNotification(targetExpoPushToken, body);
  };

  return { expoPushToken, sendFollowNotification };
}
