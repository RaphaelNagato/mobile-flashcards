import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Card, Button, Paragraph } from "react-native-paper";

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

    if (deck.questions.length === 0) {
      return (
        <View>
          <Text>Sorry, there are no questions. Add a card then try again</Text>
        </View>
      );
    }
    if (questionIndex === deck.questions.length) {
      return (
        <View>
          <Text>Quiz Completed</Text>
          <View>
            <Text>
              Score: {correctAnswers}/ {deck.questions.length}
            </Text>
            <Text>
              Percentage:{" "}
              {((correctAnswers / deck.questions.length) * 100).toFixed(2)}
            </Text>
          </View>
          <Button onPress={this.handleRetake}>Retake Quiz</Button>
          <Button
            onPress={() =>
              this.props.navigation.navigate("My Mobile Flashcards")
            }
          >
            Home
          </Button>
        </View>
      );
    }
    return (
      <ScrollView>
        <View>
          <Text>
            {questionIndex + 1} / {deck.questions.length}
          </Text>
        </View>
        <Card>
          <Card.Content>
            <Paragraph>
              {showQuestion
                ? deck.questions[questionIndex].question
                : deck.questions[questionIndex].answer}
            </Paragraph>
          </Card.Content>
          <TouchableOpacity onPress={this.handleCardFlip}>
            <Text>Question</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleCardFlip}>
            <Text>Answer</Text>
          </TouchableOpacity>
        </Card>
        <Button onPress={() => this.handleAnswerQuestion(true)}>Correct</Button>
        <Button onPress={() => this.handleAnswerQuestion(false)}>
          Incorrect
        </Button>
      </ScrollView>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { deckId } = route.params;
  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Quiz);
