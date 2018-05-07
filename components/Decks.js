import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Pluralize from 'pluralize';

class Decks extends Component {
  
  render() {

    const { decks, navigation ,id } = this.props;

    return (
      <TouchableOpacity
          style={styles.decksButton}
          onPress={() => navigation.navigate('DeckData', { id: id })}
      >
        <Text style={{ fontSize: 20 }}>{decks[id].title}</Text>
        <Text style={{ fontSize: 18, color: 'gray' }}>{Pluralize('card', decks[id].questions.length, true)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

    decksButton: {
          alignItems: 'center',
           padding: 10, margin: 10,
            backgroundColor: 'white'
        }
});

function mapStateToProps(decks) {
  
  return { decks };
}

export default connect(mapStateToProps)(Decks);
