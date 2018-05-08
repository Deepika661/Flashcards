import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import Pluralize from 'pluralize';

class DeckData extends Component {

static navigationOptions = ({ navigation }) => {

      return { title: navigation.state.params.id };
  }


  render() {

      const { deck, navigation } = this.props;

    return (
        <View style={styles.DeckArea}>
          <View style={styles.title}>
            <Text style={{ fontSize: 40 }}>{deck.title}</Text>
            <Text style={{ fontSize: 30, color: 'gray' }}>
            {Pluralize('card', deck.questions.length, true)}
            </Text>
          </View>

        <View>
          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate('CreateCard', 
              { id: navigation.state.params.id 
              })}
              title='Create your Card'
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate('Quizs',
               { id: navigation.state.params.id
                })}
              title='Start your Quiz' 
              style={styles.button}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  DeckArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    padding: 15,
    margin: 15
  },
  title: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    padding: 15,
    margin: 15,
    alignItems: 'center'
  }
  
});

function mapStateToProps(decks, ownProps) {
  
      const deck = decks[ownProps.navigation.state.params.id];
      return { deck };
}

export default connect(mapStateToProps)(DeckData);
