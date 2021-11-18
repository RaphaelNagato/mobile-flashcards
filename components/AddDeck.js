import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Deck</Text>
      </View>
    );
  }
}

export default AddDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
