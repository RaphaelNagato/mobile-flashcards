import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import { blue } from "../utils/helpers";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };

  handleQuestionChange = (question) => {
    this.setState({ question });
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch, deckId, navigation } = this.props;
    const card = { question, answer };

    dispatch(addCard(deckId, card));
    navigation.goBack();
    addCardToDeck(deckId, card);
  };
  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Add a question</Text>
          <View>
            <TextInput
              mode="outlined"
              value={question}
              onChangeText={this.handleQuestionChange}
              label="Question"
              style={styles.input}
            />
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={answer}
              onChangeText={this.handleAnswerChange}
              label="Answer"
              style={styles.input}
            />
          </View>
          <Button
            mode="contained"
            dark={true}
            color={blue}
            onPress={this.handleSubmit}
            disabled={question === "" || answer === ""}
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
    fontSize: 32,
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

function mapStateToProps(state, { route }) {
  const { deckId } = route.params;
  return {
    deckId,
  };
}

export default connect(mapStateToProps)(AddCard);
