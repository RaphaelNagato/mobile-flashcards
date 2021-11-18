import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export default function Deck({ title, noOfCards, onPress }) {
  return (
    <View style={styles.deckContainer}>
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text style={styles.deckTitle}>{title}</Text>
        </View>
        <View>
          <Text style={styles.cardText}>{noOfCards} cards</Text>
        </View>
      </TouchableOpacity>
    </View>
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
  deckTitle: {
    fontSize: 28,
  },
  cardText: {
    fontSize: 18,
    color: textGray,
  },
});
