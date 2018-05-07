import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput,Button, View, Platform, StyleSheet } from 'react-native';
import { addNewCard } from '../actions/action';
import { saveToDeck } from '../utils/apis';




class CreateCard extends Component {

static navigationOptions = ({ navigation }) => {

      return { title: `Add a new card to ${navigation.state.params.id}` };

    };

      state = {
        question: '',
        answer: ''
      }

      removeState = () => {
        this.setState({ question: '', answer: '' });
      }

      onSubmit = () => {


          const { id } = this.props.navigation.state.params;
              const { question, answer } = this.state;
              const addCard = { question: question, answer: answer };
              saveToDeck(id, addCard);
              this.props.addNewCard(id, addCard);

          this.removeState();
      }
      

 render() {

      return (

        <View style={styles.contentArea}>
            <TextInput
              style={styles.inputData}
              placeholder='Enter your Question'

              onChangeText={(question) => this.setState({ question: question })}
              value={this.state.question}
          />

        <TextInput
            style={styles.inputData}
              placeholder='Enter your Answer'
              onChangeText={(answer) => this.setState({ answer: answer })}
              value={this.state.answer}
        />

          <View style={styles.button}>
            <Button
                style={{ height: 80 }}
                title='Submit Here'
                onPress={this.onSubmit}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  contentArea: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  text: {
    fontSize: 150,
    textAlign: 'center',
    padding: 20,
    margin: 20,
    borderColor:'gray'
  },
  inputData: {
    fontSize: 30,
    alignSelf: 'stretch',
    borderColor: 'black',
    padding: 15,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    margin: 15
  },
  button: {
    padding: 15,
    margin: 15
  }
});

function mapDispatchToProps(dispatch) {

    return {
        addNewCard: (deck, card) => dispatch(addNewCard(deck, card))
    };
  }

  

export default connect(null,mapDispatchToProps)(CreateCard);
