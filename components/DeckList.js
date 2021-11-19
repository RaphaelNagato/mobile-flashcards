import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import Deck from "./Deck";
import { ActivityIndicator } from "react-native-paper";
import { blue } from "../utils/helpers";

class DeckList extends Component {
  state = {
    ready: false,
  };
  async componentDidMount() {
    try {
      const { dispatch } = this.props;
      const decks = await getDecks();
      dispatch(receiveDecks({ decks }));
      this.setState(() => ({
        ready: true,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  onDeckPress = (id) => {
    const { navigation } = this.props;
    navigation.navigate("Deck Detail", { deckId: id });
  };

  renderItem = ({ item }) => {
    return (
      <Deck
        title={item.title}
        noOfCards={item.questions.length}
        onPress={() => this.onDeckPress(item.title)}
      />
    );
  };

  render() {
    const { ready } = this.state;
    if (!ready) {
      return <ActivityIndicator animating={true} color={blue} />;
    }
    const { decks } = this.props;
    let arrayOfDecks = Object.keys(decks).map((k) => decks[k]);
    return (
      <View style={styles.container}>
        <FlatList
          data={arrayOfDecks}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(DeckList);
