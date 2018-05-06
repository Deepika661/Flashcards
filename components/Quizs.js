import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { clearLocalNotification, setLocalNotification } from '../utils/notifications';



class Quizs extends Component {
 static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.id} Quiz`};
  };

 state = {
    currentCard: 0,
    displayQuestion: true,
    quizComplete: false,
    correctCount: 0
  }

 incrementCard(correct) {
    const { currentCard, correctCount } = this.state;
    const { questions } = this.props.deck;
    const newCard = currentCard + 1;
    const newCount = correct ? correctCount + 1 : correctCount;

    if (newCard < questions.length) {
      this.setState({
        currentCard: newCard,
        displayQuestion: true,
        correctCount: newCount
      });
    } else {
      clearLocalNotification()
        .then(setLocalNotification);

      this.setState({
        quizComplete: true,
        displayQuestion: true,
        correctCount: newCount
      });
    }
  }


 renderQuestion() {
    const { currentCard } = this.state;
    const question = this.props.deck.questions[currentCard];

    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>{question.question}</Text>
        <Button
          title='View answer'
          onPress={() => this.setState({ displayQuestion: false })}
        />
      </View>
    );
  }

  renderAnswer() {
    const { currentCard } = this.state;
    const question = this.props.deck.questions[currentCard];

    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>{question.answer}</Text>
        <Button
          title='View question'
          onPress={() => this.setState({ displayQuestion: true })}
        />
      </View>
    );
  }

  renderQuiz() {
    const { currentCard, displayQuestion } = this.state;
    const { questions } = this.props.deck;

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Card {currentCard + 1} of {questions.length}</Text>
        {displayQuestion ? this.renderQuestion() : this.renderAnswer()}

        <View style={styles.button}>
          <Button
            color='green'
            title='Correct'
            onPress={() => this.incrementCard(true)}
          />
        </View>

        <View style={styles.button}>
          <Button
            color='red'
            title='Incorrect'
            onPress={() => this.incrementCard(false)}
          />
        </View>
      </View>
    );
  }

  restartQuiz() {
    this.setState({
      currentCard: 0,
      displayQuestion: true,
      quizComplete: false,
      correctCount: 0
    });
  }

  renderQuizComplete() {
    const { correctCount } = this.state;
    const { questions } = this.props.deck;

    return (
      <View>
        <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>
          You answered {correctCount} out of {questions.length} questions correctly!
        </Text>

        <View style={styles.button}>
          <Button
            title='Restart Quiz'
            onPress={() => this.restartQuiz()}
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Back to Deck'
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  render() {
    const { quizComplete } = this.state;
    const { questions } = this.props.deck;

    if (questions.length === 0) {
      return (
        <Text style={{ fontSize: 30, textAlign: 'center', padding: 10 }}>
          There aren't any cards in this deck! Please add cards before starting a quiz.
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        {!quizComplete
          ? this.renderQuiz()
          : this.renderQuizComplete()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'
  },
  button: {
    padding: 10,
    margin: 10
  }
});

function mapStateToProps(decks, ownProps) {
  const deck = decks[ownProps.navigation.state.params.id];
  return { deck };
}

export default connect(mapStateToProps)(Quizs);
