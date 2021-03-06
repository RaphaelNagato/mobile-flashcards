import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { gray } from "../utils/helpers";

export default function Screen({ children }) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: gray,
  },
});
