import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card, Button, Paragraph } from "react-native-paper";
import {
  blue,
  clearLocalNotification,
  gray,
  green,
  red,
  setLocalNotification,
  white,
} from "../utils/helpers";

class Quiz extends Component {
  state = {
    showQuestion: true,
    questionIndex: 0,
    correctAnswers: 0,
  };

  handleCardFlip = () => {
    this.setState((prevState) => ({
      showQuestion: !prevState.showQuestion,
    }));
  };

  handleAnswerQuestion = (isCorrect) => {
    if (isCorrect) {
      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1,
      }));
    }
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      showQuestion: true,
    }));
  };

  handleRetake = () => {
    this.setState({
      showQuestion: true,
      questionIndex: 0,
      correctAnswers: 0,
    });
  };

  render() {
    const { questionIndex, showQuestion, correctAnswers } = this.state;
    const { deck } = this.props;
    const isPercentageGood =
      ((correctAnswers / deck.questions.length) * 100).toFixed(2) >= 75;

    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Sorry, there are no questions. Add a card then try again
          </Text>
        </View>
      );
    }
    if (questionIndex === deck.questions.length) {
      clearLocalNotification().then(setLocalNotification);
      return (
        <View style={styles.container}>
          <Text style={styles.count}>Quiz Completed</Text>
          <View>
            <Text style={styles.title}>
              You answered {correctAnswers} out of {deck.questions.length}{" "}
              correctly
            </Text>
            <Text style={styles.percent}>Percentage: </Text>
            <Text
              style={
                isPercentageGood ? styles.goodResultText : styles.badResultText
              }
            >
              {((correctAnswers / deck.questions.length) * 100).toFixed(2)}%
            </Text>
          </View>
          <View>
            <Button
              mode="contained"
              dark={true}
              color={blue}
              style={styles.button}
              onPress={this.handleRetake}
            >
              Retake Quiz
            </Button>
            <Button
              mode="outlined"
              color={blue}
              style={[styles.button, { backgroundColor: white }]}
              onPress={() =>
                this.props.navigation.navigate("My Mobile Flashcards")
              }
            >
              Home
            </Button>
          </View>
        </View>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.count}>
            {questionIndex + 1} / {deck.questions.length}
          </Text>
        </View>
        <View>
          <Card style={styles.questionContainer}>
            <Card.Content>
              <Paragraph style={styles.questionText}>
                {showQuestion
                  ? deck.questions[questionIndex].question
                  : deck.questions[questionIndex].answer}
              </Paragraph>
            </Card.Content>
          </Card>
          <View>
            <TouchableOpacity
              style={showQuestion && { display: "none" }}
              onPress={this.handleCardFlip}
            >
              <Text style={styles.cardFlipText}>Question</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={!showQuestion && { display: "none" }}
              onPress={this.handleCardFlip}
            >
              <Text style={styles.cardFlipText}>Answer</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button
            mode="contained"
            dark={true}
            color={blue}
            style={styles.button}
            onPress={() => this.handleAnswerQuestion(true)}
          >
            Correct
          </Button>
          <Button
            mode="contained"
            dark={true}
            color={red}
            style={styles.button}
            onPress={() => this.handleAnswerQuestion(false)}
          >
            Incorrect
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-around",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
  },
  questionText: {
    textAlign: "center",
    fontSize: 20,
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 5,
    padding: 30,
    flexGrow: 1,
  },
  cardFlipText: {
    textAlign: "center",
    margin: 15,
    textDecorationLine: "underline",
    color: "red",
    fontSize: 25,
  },
  button: {
    margin: 15,
    padding: 10,
    fontSize: 20,
  },
  goodResultText: {
    color: green,
    fontSize: 46,
    textAlign: "center",
  },
  badResultText: {
    color: red,
    fontSize: 46,
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },
  percent: {
    marginTop: 25,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
});

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;
  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Quiz);
