import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Button } from "react-native-paper";
import { blue, gray, red, white } from "../utils/helpers";
import { connect } from "react-redux";
import { removeDeck } from "../actions";
import { deleteDeck } from "../utils/api";

class DeckDetail extends Component {
  state = {
    bounceAnim: new Animated.Value(0),
  };

  componentDidMount() {
    const { bounceAnim } = this.state;
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.title !== undefined && nextProps.noOfCards !== undefined;
  }

  handleDeleteDeck = async () => {
    const { remove, goBack, title } = this.props;
    remove();
    await deleteDeck(title);
    goBack();
  };

  handleAddCard = (id) => {
    this.props.navigation.navigate("Add Card", { deckId: id });
  };

  showQuiz = (id) => {
    this.props.navigation.navigate("Quiz", { deckId: id });
  };

  render() {
    const { title, noOfCards } = this.props;
    const { bounceAnim } = this.state;
    return (
      <Animated.View
        style={[styles.container, { transform: [{ scale: bounceAnim }] }]}
      >
        <View style={styles.textView}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.cardText}>{noOfCards} cards</Text>
        </View>
        <View>
          <Button
            mode={"contained"}
            dark={true}
            color={blue}
            style={styles.button}
            onPress={() => this.handleAddCard(title)}
          >
            Add Card
          </Button>
          <Button
            mode={"outlined"}
            color={blue}
            style={[styles.button, styles.button2]}
            onPress={() => this.showQuiz(title)}
          >
            Start Quiz
          </Button>
        </View>
        <Button
          mode={"contained"}
          dark={true}
          color={red}
          style={styles.button}
          onPress={async () => await this.handleDeleteDeck()}
        >
          Delete Deck
        </Button>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 16,
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
  button: {
    paddingVertical: 15,
  },
  button2: { backgroundColor: white, marginTop: 15 },
});

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;

  return {
    title: deckId,
    noOfCards: decks[deckId] && decks[deckId].questions.length,
  };
}

function mapDispatchToProps(dispatch, { route, navigation }) {
  const { deckId } = route.params;
  return {
    remove: () => dispatch(removeDeck(deckId)),
    goBack: () => navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
