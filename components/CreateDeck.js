import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { NavigationActions } from 'react-native-deprecated-custom-components';

import { connect } from 'react-redux';
import {addNewDeck} from '../actions/action';
import {saveNewDeck} from '../utils/apis';


class CreateDeck extends Component {
	 state = {
    title: ''
  }

 submit = () => {
    const { title } = this.state;
    saveNewDeck(title);
    this.props.addNewDeck(title);
    const resetDeck = NavigationActions.reset({
      index: 1,
	      actions: [

	        NavigationActions.navigate({ routeName: 'Home' }),
	        NavigationActions.navigate({ routeName: 'DeckData', params: { id: title } })
	      ]
    });

    this.props.navigation.dispatch(resetDeck);
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please Enter New Deck Name:</Text>
        <TextInput
          style={styles.input}
          placeholder='Deck Name'
          onChangeText={(title) => this.setState({ title: title })}
          value={this.state.title}
        />

        <View style={styles.button}>
          <Button
            title='Create NewDeck'
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    padding: 10,
    margin: 10
  },
  input: {
    fontSize: 30,
    alignSelf: 'stretch',
    borderColor: 'gray',
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    padding: 10,
    margin: 10
  },
  button: {
    padding: 10,
    margin: 10
  }
});

function mapDispatchToProps(dispatch) {
  return {
    addNewDeck: (deck) => dispatch(addNewDeck(deck))
  };
}

export default connect(null, mapDispatchToProps)(CreateDeck);
