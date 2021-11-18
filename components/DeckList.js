import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { blue } from "../utils/helpers";

class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          color={blue}
          dark={true}
          onPress={() => this.props.navigation.navigate("Deck Detail")}
        >
          Press me
        </Button>
      </View>
    );
  }
}

export default DeckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
