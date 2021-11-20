import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Colors
export const white = "#fff";
export const red = "#b71845";
export const blue = "#1DA1F2";
export const gray = "#757575";
export const green = "#00FF00";

// Notifications
const NOTIFICATION_KEY = "MyMobileFlashcards:notifications";
export async function clearLocalNotification() {
  try {
    const result = await AsyncStorage.removeItem(NOTIFICATION_KEY);
    return Notifications.cancelAllScheduledNotificationsAsync(result);
  } catch (message) {
    return console.error(message);
  }
}

function createNotification() {
  return {
    title: "Study with My Mobile Flashcards",
    body: "Don't forget to study today",
    ios: {
      sound: true,
      priority: true,
      vibrate: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (!data) {
        Notifications.requestPermissionsAsync()
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync().catch(
                (err) => console.log(err)
              );

              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: {
                  hour: 20,
                  minute: 0,
                  repeats: true,
                },
              }).catch((err) => console.log(err));

              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: true,
                }),
              });

              AsyncStorage.setItem(
                NOTIFICATION_KEY,
                JSON.stringify(true)
              ).catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
}
