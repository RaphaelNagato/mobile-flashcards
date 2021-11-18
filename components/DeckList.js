import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { blue } from "../utils/helpers";

class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList />
      </View>
    );
  }
}

export default DeckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
