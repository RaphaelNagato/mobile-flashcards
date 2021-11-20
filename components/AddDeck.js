import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { addDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";
import { blue } from "../utils/helpers";
import { connect } from "react-redux";

class AddDeck extends Component {
  state = {
    title: "",
  };

  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleSubmit = () => {
    const { title } = this.state;
    const { dispatch, navigation } = this.props;
    this.setState({
      title: "",
    });

    dispatch(
      addDeck({
        [title]: {
          title,
          questions: [],
        },
      })
    );
    navigation.navigate("Decks");
    saveDeckTitle(title);
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>What's the name of your new Deck?</Text>
          <View>
            <TextInput
              mode="outlined"
              value={title}
              onChangeText={this.handleTitleChange}
              label="Name of Deck"
              style={styles.input}
            />
          </View>
          <Button
            mode="contained"
            dark={true}
            color={blue}
            onPress={this.handleSubmit}
            disabled={title === ""}
            style={styles.button}
          >
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginVertical: 20,
  },
  input: {
    marginHorizontal: 20,
    height: 40,
  },
  button: {
    margin: 20,
  },
});

export default connect()(AddDeck);
