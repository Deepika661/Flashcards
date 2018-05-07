import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications';
import { connect } from 'react-redux';




class Quizs extends Component {


   static navigationOptions = ({ navigation }) => {
      return { title:`Your ${navigation.state.params.id} Quiz starts`};
    };

   state = {
      presentCard: 0,
      showQuestion: true,
      quizOver: false,
      rightCount: 0
    }

 increaseCard(right) {
  
    const { presentCard, rightCount } = this.state;

    const { questions } = this.props.deck;
    const nextCard = presentCard + 1;
    const nextCount = right ? rightCount + 1 : rightCount;

    if (nextCard < questions.length) {
      this.setState({
        presentCard: nextCard,
        showQuestion: true,
        rightCount: nextCount
      });
    } else {
      clearLocalNotifications()
        .then(setLocalNotification);

      this.setState({
        quizOver: true,
        showQuestion: true,
        rightCount: nextCount
      });
    }
  }


 renderQuestion() {
      const { presentCard } = this.state;
      const question = this.props.deck.questions[presentCard];

    return (
      <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>{question.question}</Text>
          <Button
            title='Check answer'
            onPress={() => this.setState({ showQuestion: false })}
          />
      </View>
    );
  }

  renderAnswer() {
    const { presentCard } = this.state;
      const question = this.props.deck.questions[presentCard];

    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>{question.answer}</Text>
        <Button
          title='Check question'
          onPress={() => this.setState({ showQuestion: true })}
        />
      </View>
    );
  }

  renderQuiz() {

        const { presentCard, showQuestion } = this.state;

        const { questions } = this.props.deck;

          return (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 18 }}>Card {presentCard + 1} of {questions.length}</Text>
                  {showQuestion ? this.renderQuestion() : this.renderAnswer()}

                  <View style={styles.button}>
                      <Button
                        color='green'
                        title='right'
                        onPress={() => this.increaseCard(true)}
                      />
                  </View>

              <View style={styles.button}>
                  <Button
                    color='red'
                    title='Incorrect'
                    onPress={() => this.increaseCard(false)}
                  />
              </View>
            </View>
          );
        }

  startQuizAgain() {
        this.setState({

          presentCard: 0,
          showQuestion: true,
          quizOver: false,
          rightCount: 0

        });
  }

  renderQuizOver() {
      const { rightCount } = this.state;
      const { questions } = this.props.deck;

    return (
      <View>
        <Text style={{ fontSize: 25, padding: 10, textAlign: 'center' }}>
          You answered {rightCount} out of {questions.length} questions rightly!
        </Text>

        <View style={styles.button}>
            <Button
              title='Start your quiz again'
              onPress={() => this.startQuizAgain()}
            />
        </View>

        <View style={styles.button}>
          <Button
              title='Go back to deck area'
              onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  render() {
      const { quizOver } = this.state;
      const { questions } = this.props.deck;

      if (questions.length === 0) {

          return (
            <Text style={{ fontSize: 30, textAlign: 'center', padding: 10 }}>
              Oops no Cards available in this deck! Please add your cards to start quiz.
            </Text>
          );
    }

    return (
        <View style={styles.contentArea}>
          {
            !quizOver
            ? this.renderQuiz()
            : this.renderQuizOver()
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  contentArea: {
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
