import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

//MaterialDesignComponents import
import { Provider as PaperProvider } from "react-native-paper";

//user-created imports
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import { white, blue } from "./utils/helpers";

const FlashCardStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

const RouteConfigs = {
  DeckList: {
    name: "Decks",
    component: DeckList,
    options: {
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="cards" size={30} color={color} />
      ),
      title: "Decks",
    },
  },
  AddDeck: {
    component: AddDeck,
    name: "Add Deck",
    options: {
      tabBarIcon: ({ color }) => (
        <Ionicons name="add-circle" size={30} color={color} />
      ),
      title: "Add Deck",
    },
  },
};

const HomeNav = () => (
  <Tab.Navigator
    initialRouteName="Decks"
    activeColor={blue}
    barStyle={{
      height: 56,
      backgroundColor: white,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }}
  >
    <Tab.Screen {...RouteConfigs["DeckList"]} />
    <Tab.Screen {...RouteConfigs["AddDeck"]} />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Deck Detail"
      component={DeckDetail}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue,
        },
      }}
      title="Deck Detail"
    />
  </Stack.Navigator>
);

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <FlashCardStatusBar backgroundColor={blue} style="light" />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});
