import "react-native-gesture-handler";
import React, { Component } from "react";
import { View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//Redux
import { createStore } from "redux";
import { Provider as StoreProvider } from "react-redux";
import reducer from "./reducers";

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
import Screen from "./components/Screen";
import { white, blue, setLocalNotification } from "./utils/helpers";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

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
      name="My Mobile Flashcards"
      component={HomeNav}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue,
        },
      }}
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
    <Stack.Screen
      name="Add Card"
      component={AddCard}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue,
        },
      }}
      title="Add Card"
    />
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue,
        },
      }}
      title="Quiz"
    />
  </Stack.Navigator>
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <StoreProvider store={createStore(reducer)}>
        <PaperProvider>
          <Screen>
            <FlashCardStatusBar backgroundColor={blue} style="light" />
            <NavigationContainer>
              <MainNav />
            </NavigationContainer>
          </Screen>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
