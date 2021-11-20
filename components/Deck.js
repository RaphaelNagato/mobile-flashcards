import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { white, gray } from "../utils/helpers";

export default function Deck({ title, noOfCards, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.deckContainer}>
        <View style={styles.textView}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.cardText}>{noOfCards} cards</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
  },
  textView: {
    justifyContent: "center",
    alignItems: "center",
  },
  deckTitle: {
    fontSize: 28,
  },
  cardText: {
    fontSize: 18,
    color: gray,
  },
});
